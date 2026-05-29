#Requires AutoHotkey v2.0
#SingleInstance Force

SetWorkingDir A_ScriptDir
SendMode "Event"
SetKeyDelay 80, 80

if (A_Args.Length < 1) {
    ExitApp 2
}

command := Trim(A_Args[1])
settleMs := 1200
if (A_Args.Length >= 2) {
    try settleMs := Integer(A_Args[2])
}

hwnd := WinExist("ahk_exe SC2_x64.exe")
if !hwnd {
    ExitApp 3
}

WinActivate("ahk_id " hwnd)
WinWaitActive("ahk_id " hwnd, , 3)
Sleep 700

A_Clipboard := command
ClipWait(2)

; Open the SC2 chat input explicitly, then paste and send the command.
SendEvent "{Enter}"
Sleep 900
SendText command
Sleep 350
SendEvent "{Enter}"
Sleep settleMs

ExitApp 0
