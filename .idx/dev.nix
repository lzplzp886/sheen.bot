# .idx/dev.nix
{ pkgs, ... }: { # 注意：这里通常需要写 { pkgs, ... } 而不仅是 { pkgs }，以防未来有其他参数

  # 1. 基础频道
  channel = "stable-24.05";

  # 2. 系统级安装包
  packages = [
    pkgs.nodejs_22
    pkgs.yarn
    pkgs.openssh # 添加 scp 支持
  ];

  # 3. 环境变量 (可选，没有可留空)
  env = {};

  # 4. IDX 核心配置 (把 extensions, previews, workspace 都包在这里面)
  idx = {
    # 插件
    extensions = [
      "ESLint.vscode-eslint"
      "esbenp.prettier-vscode"
    ];

    # 预览设置
    previews = {
      enable = true; # 建议显式开启
      previews = {
        web = {
          command = ["yarn" "dev" "--port" "$PORT" "--hostname" "0.0.0.0"];
          manager = "web";
        };
      };
    };

    # 生命周期钩子
    workspace = {
      # 注意：这里直接写 onCreate，不要再套一层 workspace 了
      onCreate = {
        install-dependencies = "yarn install";
        # 可以在这里加其他命令，比如初始化 .env
        # setup-env = "cp .env.example .env.local"; 
      };
      
      onStart = {
        # 每次重启环境时运行 (可选)
      };
    };
  };
}