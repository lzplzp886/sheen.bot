#!/usr/bin/env bash
# 文件名：refresh.sh

# 1. 进入脚本所在目录（假设你就在仓库根目录执行脚本）
cd "$(dirname "$0")" || exit 1

# 2. 拉取远端更新
git fetch origin

# 3. 重置到 origin/main —— 如果你的主分支不是 main，可以把 main 换成对应名字
git reset --hard origin/main

# 4. 清理未跟踪文件和目录
git clean -fd

echo "🔄 Repository refreshed to origin/main"
