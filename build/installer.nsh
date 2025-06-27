!macro preInit
  ; 强制设置默认安装路径（需管理员权限）
  SetShellVarContext all
  StrCpy $INSTDIR "C:\MyApp"
  
  ; 写入注册表记录安装位置（64/32位系统兼容）
  SetRegView 64
  WriteRegExpandStr HKLM "Software\MyApp" "InstallPath" "$INSTDIR"
  SetRegView 32
  WriteRegExpandStr HKLM "Software\MyApp" "InstallPath" "$INSTDIR"
!macroend

!macro customInit
  ; 安装前清理旧版本
  Delete "$INSTDIR\uninstall.exe"
  RMDir /r "$INSTDIR"
!macroend
