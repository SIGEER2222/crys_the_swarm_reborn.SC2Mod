#Requires AutoHotkey v2.0
#SingleInstance Force

SetWorkingDir A_ScriptDir

if (A_Args.Length < 1) {
    FileAppend("ERROR=missing_command`n", "*")
    ExitApp 2
}

command := Trim(A_Args[1])
settleMs := 1200
if (A_Args.Length >= 2) {
    try settleMs := Integer(A_Args[2])
}

hwnd := WinExist("ahk_exe SC2_x64.exe")
if !hwnd {
    FileAppend("ERROR=sc2_not_found`n", "*")
    ExitApp 3
}

WinActivate("ahk_id " hwnd)
WinWaitActive("ahk_id " hwnd, , 3)
Sleep 400

A_Clipboard := command
ClipWait(2)

Send "{Esc}"
Sleep 180
Send "{Esc}"
Sleep 180
Send "{Enter}"
Sleep 180
Send "^v"
Sleep 180
Send "{Enter}"
Sleep settleMs
Send "{Esc}"
Sleep 180

FileAppend("CHAT_COMMAND=" command "`n", "*")
FileAppend("CHAT_SENT=1`n", "*")
ExitApp 0
