
{ pkgs }: {
  channel = "stable-24.11";
  packages = [ pkgs.nodejs_20 pkgs.zulu ];
  idx = {
    workspace.onCreate.npm-install = "npm install";
    previews = {
      enable = true;
      previews.web = {
        command = ["npm" "run" "dev" "--" "-p" "$PORT"];
        manager = "web";
      };
    };
  };
}