import path from "node:path";
import fs from "node:fs";

// 文件根目录
const DIR_PATH = path.resolve();
// 白名单,过滤不是文章的文件和文件夹
const WHITE_LIST = [
  "index.md",
  ".vitepress",
  "node_modules",
  ".idea",
  "assets",
];

// 判断是否是文件夹
const isDirectory = (path) => fs.lstatSync(path).isDirectory();

// 过滤规则：白名单精确匹配 + 排除 *.assets 图片资源目录 + 排除隐藏目录
// （*.assets 是 Typora 导入图片时在文档旁生成的图片文件夹，不应出现在侧边栏）
const filterEntries = (files) =>
  files.filter(
    (name) =>
      !WHITE_LIST.includes(name) &&
      !name.startsWith(".") &&
      !name.endsWith(".assets")
  );

// 取差值（保持传入顺序）
const intersections = (arr1, arr2) => {
  const exclude = new Set(arr2);
  return Array.from(new Set(arr1.filter((item) => !exclude.has(item))));
};

// fs.readdirSync 不保证返回顺序（NTFS / ext4 各不相同），
// 必须显式排序，否则本地与 Linux CI 构建出的侧边栏顺序会不一致。
// numeric: true 让 01- 02- 这类数字前缀按数值而非字典序排列。
const sortEntries = (files) =>
  [...files].sort((a, b) => a.localeCompare(b, "zh-Hans-CN", { numeric: true }));

// 剥离开头的数字前缀（用于排序，显示时隐藏）
const stripPrefix = (name) => name.replace(/^\d{1,2}[-－.]?\s*/, "");

// 把方法导出直接使用
function getList(params, path1, pathname) {
  // 存放结果
  const res = [];
  // 开始遍历params
  for (let file in params) {
    // 拼接目录
    const dir = path.join(path1, params[file]);
    // 判断是否是文件夹
    const isDir = isDirectory(dir);
    if (isDir) {
      // 如果是文件夹,读取之后作为下一次递归参数（递归时同样过滤白名单，
      // 否则子目录里的 index.md 会变成侧边栏里一个叫 "index" 的条目）
      const files = filterEntries(sortEntries(fs.readdirSync(dir)));
      const subPath = `${pathname}/${params[file]}`;
      const items = getList(files, dir, subPath);

      // 目录里只剩 index.md（白名单过滤后 files 可能为空）时，直接降级成一个普通链接，
      // 避免出现 "目录 > index" 这种无意义的一层嵌套
      const onlyIndex =
        items.length === 0 &&
        (files.length === 0 || (files.length === 1 && files[0] === "index.md"));

      if (onlyIndex) {
        res.push({ text: stripPrefix(params[file]), link: subPath });
      } else {
        res.push({
          text: stripPrefix(params[file]),
          collapsible: true,
          items,
        });
      }
    } else {
      // 获取名字
      const name = path.basename(params[file]);
      // 排除非 md 文件
      const suffix = path.extname(params[file]);
      if (suffix !== ".md") {
        continue;
      }
      res.push({
        text: name,
        link: `${pathname}/${name}`,
      });
    }
  }
  // 对name做一下处理：去掉 .md 后缀，并剥离开头的数字前缀（文件夹保留数字用于排序，显示时隐藏）
  res.map((item) => {
    item.text = item.text.replace(/\.md$/, "").replace(/^\d{1,2}[-－.]?\s*/, "");
  });
  // 目录分组排在文章之前；同级内保持上面的排序结果
  res.sort((a, b) => Number(Boolean(b.link)) - Number(Boolean(a.link)));
  return res;
}

export const set_sidebar = (pathname) => {
  // 获取pathname的路径
  const dirPath = path.join(DIR_PATH, pathname);
  // 读取pathname下的所有文件或者文件夹，并显式排序保证构建可复现
  const files = sortEntries(fs.readdirSync(dirPath));
  // 过滤掉
  const items = filterEntries(files);
  // getList 函数后面会讲到
  return getList(items, dirPath, pathname);
};