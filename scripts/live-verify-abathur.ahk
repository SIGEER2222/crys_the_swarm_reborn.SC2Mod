#Requires AutoHotkey v2.0
#SingleInstance Force

SetWorkingDir A_ScriptDir
CoordMode "Mouse", "Screen"

config := ParseArgs(A_Args)
global gRunLogPath := A_ScriptDir "\..\tmp_live_verify_abathur_" A_Now ".log"
if config.Help {
    PrintHelp()
    ExitApp 0
}

try {
    RunMain(config)
} catch as err {
    Log("ERROR=" err.Message)
    ExitApp 1
}

ExitApp 0

RunMain(config) {
    mapIndex := config.MapClick + 0
    if (mapIndex < 1)
        mapIndex := 1

    commanderIndex := GetCommanderIndex(config.Commander)
    if config.DryRun {
        Log("DRY_RUN=1")
        Log("COMMANDER=" config.Commander)
        Log("COMMANDER_INDEX=" commanderIndex)
        Log("MAP_INDEX=" mapIndex)
        Log("LAUNCH_GAME=" (config.LaunchGame ? 1 : 0))
        Log("RESTART_EXISTING=" (config.RestartExisting ? 1 : 0))
        Log("CLOSE_GAME=" (config.CloseGame ? 1 : 0))
        return
    }

    if config.LaunchGame {
        Log("STEP=launch")
        StartLauncherGame(config)
    }

    Log("STEP=wait_window")
    proc := WaitSc2Window(60)
    Log("STEP=focus_window")
    rect := FocusSc2Window(proc.Hwnd)

    if config.ClickLogin {
        Log("STEP=click_login")
        ClickBattleNetLogin(rect)
    }

    Log("STEP=launcher_ready_wait")
    Sleep config.LauncherReadyWaitMs

    Log("STEP=resolve_commander")
    if (commanderIndex = "") {
        throw Error("Commander not found in UserData.xml: " config.Commander)
    }

    commanderPoint := GetCommanderButtonPoint(rect, commanderIndex)
    mapPoint := GetMapButtonPoint(rect, mapIndex)
    difficultyPoint := GetDifficultyButtonPoint(rect, 0)

    if config.DryRun {
        Log("DRY_RUN=1")
        Log("WINDOW_RECT=" rect.Left "," rect.Top "," (rect.Right - rect.Left) "," (rect.Bottom - rect.Top))
        Log("COMMANDER=" config.Commander)
        Log("COMMANDER_INDEX=" commanderIndex)
        Log("MAP_INDEX=" mapIndex)
        Log("COMMANDER_POINT=" commanderPoint[1] "," commanderPoint[2])
        Log("MAP_POINT=" mapPoint[1] "," mapPoint[2])
        Log("DIFFICULTY_POINT=" difficultyPoint[1] "," difficultyPoint[2])
        return
    }

    Log("STEP=click_commander")
    ClickAbsolute(commanderPoint[1], commanderPoint[2], 900)
    Sleep 1200

    Log("STEP=click_map")
    ClickAbsolute(mapPoint[1], mapPoint[2], 450)
    Log("STEP=click_difficulty")
    ClickAbsolute(difficultyPoint[1], difficultyPoint[2], 300)
    Log("STEP=confirm_map")
    ClickAbsolute(mapPoint[1], mapPoint[2], config.InitialLoadWaitMs)

    Log("STEP=wait_load")
    loadWindow := WaitForLoadWindow(A_Now, config.LoadWaitMinSec, config.LoadWaitMaxSec, config.LoadPollIntervalSec)
    Sleep config.InitialLoadWaitMs

    if config.ProbeTopBarButtons != "" {
        Log("STEP=probe_topbar")
        probeRect := FocusSc2Window(WaitSc2Window(10).Hwnd)
        for _, token in StrSplit(config.ProbeTopBarButtons, ",") {
            token := Trim(token)
            if (token = "")
                continue
            point := GetTopBarButtonPoint(probeRect, Integer(token))
            ClickAbsolute(point[1], point[2], 900)
        }
    }

    if config.ProbeCommandCardSlots != "" {
        Log("STEP=probe_command_card")
        probeRect := FocusSc2Window(WaitSc2Window(10).Hwnd)
        for _, token in StrSplit(config.ProbeCommandCardSlots, ",") {
            token := Trim(token)
            if (token = "")
                continue
            point := GetCommandCardPoint(probeRect, Integer(token))
            ClickAbsolute(point[1], point[2], 900)
        }
    }

    Log("STEP=escape")
    Loop config.EscapeCount {
        proc := WaitSc2Window(10)
        FocusSc2Window(proc.Hwnd)
        Send "{Esc}"
        Sleep 900
    }

    Log("PID=" proc.Pid)
    Log("WINDOW_RECT=" rect.Left "," rect.Top "," (rect.Right - rect.Left) "," (rect.Bottom - rect.Top))
    Log("COMMANDER=" config.Commander)
    Log("COMMANDER_INDEX=" commanderIndex)
    Log("MAP_INDEX=" mapIndex)
    Log("MAP_POINT=" mapPoint[1] "," mapPoint[2])
    Log("DIFFICULTY_POINT=" difficultyPoint[1] "," difficultyPoint[2])
    Log("LOAD_WAIT_TARGET_SEC=" loadWindow.TargetSec)
    Log("LOAD_WAIT_ELAPSED_SEC=" loadWindow.ElapsedSec)
    Log("LOAD_WAIT_SIGNAL=" loadWindow.Signal)

    if config.CloseGame {
        CloseSc2()
        Log("GAME_CLOSED=1")
    }
}

ParseArgs(args) {
    cfg := {
        Commander: "Abathur",
        MapClick: "1",
        OutputPrefix: "",
        CloseGame: true,
        LaunchGame: true,
        RestartExisting: true,
        InitialLoadWaitMs: 15000,
        LoadWaitMinSec: 60,
        LoadWaitMaxSec: 180,
        LoadPollIntervalSec: 5,
        EscapeCount: 18,
        ProbeTopBarButtons: "0,1,2,3",
        ProbeCommandCardSlots: "7,9,11,15",
        Sc2SwitcherPath: "E:\SC2\SC2new\StarCraft II\Support64\SC2Switcher_x64.exe",
        LauncherMapPath: "E:\SC2\SC2new\StarCraft II\Maps\XM\Launcher.SC2Map",
        LauncherReadyWaitMs: 45000,
        ClickLogin: false,
        DryRun: false,
        Help: false,
    }

    pos := 0
    for _, raw in args {
        arg := Trim(raw)
        lower := StrLower(arg)

        if (lower = "--help" || lower = "-h" || lower = "/?") {
            cfg.Help := true
            continue
        }
        if (lower = "--dry-run") {
            cfg.DryRun := true
            continue
        }
        if (lower = "--click-login") {
            cfg.ClickLogin := true
            continue
        }
        if (lower = "--no-close") {
            cfg.CloseGame := false
            continue
        }
        if (lower = "--no-launch") {
            cfg.LaunchGame := false
            continue
        }
        if (lower = "--no-restart") {
            cfg.RestartExisting := false
            continue
        }
        if (lower = "--close") {
            cfg.CloseGame := true
            continue
        }
        if (lower = "--launch") {
            cfg.LaunchGame := true
            continue
        }
        if (lower = "--restart") {
            cfg.RestartExisting := true
            continue
        }

        if InStr(arg, "=") {
            parts := StrSplit(arg, "=", , 2)
            key := StrLower(Trim(parts[1], "-"))
            value := parts.Length > 1 ? parts[2] : ""
            switch key {
                case "commander":
                    cfg.Commander := value
                case "mapclick", "map":
                    cfg.MapClick := value
                case "outputprefix", "prefix":
                    cfg.OutputPrefix := value
                case "initialloadwaitms":
                    cfg.InitialLoadWaitMs := value + 0
                case "loadwaitminsec":
                    cfg.LoadWaitMinSec := value + 0
                case "loadwaitmaxsec":
                    cfg.LoadWaitMaxSec := value + 0
                case "loadpollintervalsec":
                    cfg.LoadPollIntervalSec := value + 0
                case "escapecount":
                    cfg.EscapeCount := value + 0
                case "probetopbarbuttons":
                    cfg.ProbeTopBarButtons := value
                case "probecommandcardslots":
                    cfg.ProbeCommandCardSlots := value
                case "sc2switcherpath":
                    cfg.Sc2SwitcherPath := value
                case "launchermappath":
                    cfg.LauncherMapPath := value
                case "launcherreadywaitms":
                    cfg.LauncherReadyWaitMs := value + 0
                default:
                    ; Ignore unknown switches so the script stays easy to extend.
            }
            continue
        }

        pos += 1
        switch pos {
            case 1:
                cfg.Commander := arg
            case 2:
                cfg.MapClick := arg
            case 3:
                cfg.OutputPrefix := arg
        }
    }

    return cfg
}

PrintHelp() {
    Log("Usage:")
    Log("  AutoHotkey64.exe live-verify-abathur.ahk [--dry-run] [--no-launch] [--no-close] [--commander=Abathur] [--mapclick=1]")
}

StartLauncherGame(config) {
    if config.RestartExisting
        CloseSc2()

    if !FileExist(config.Sc2SwitcherPath)
        throw Error("SC2 switcher not found: " config.Sc2SwitcherPath)

    if !FileExist(config.LauncherMapPath)
        throw Error("Launcher map not found: " config.LauncherMapPath)

    Run(Format('"{1}" "{2}"', config.Sc2SwitcherPath, config.LauncherMapPath), , "Hide")
}

CloseSc2() {
    for _, imageName in ["SC2_x64.exe", "SC2.exe"] {
        try RunWait(Format('taskkill /F /IM {1} /T', imageName), , "Hide")
    }
}

WaitSc2Window(timeoutSec) {
    deadline := A_TickCount + (timeoutSec * 1000)
    while (A_TickCount < deadline) {
        try hwnd := WinGetID("ahk_exe SC2_x64.exe")
        catch
            hwnd := 0

        if (hwnd) {
            WinGetPos &x, &y, &w, &h, "ahk_id " hwnd
            if (w >= 1000 && h >= 700)
                return { Hwnd: hwnd, Pid: WinGetPID("ahk_id " hwnd), Left: x, Top: y, Right: x + w, Bottom: y + h }
        }
        Sleep 1000
    }

    throw Error("SC2_x64 window did not become ready in time.")
}

FocusSc2Window(hwnd) {
    WinRestore "ahk_id " hwnd
    Sleep 250
    WinActivate "ahk_id " hwnd
    WinWaitActive "ahk_id " hwnd, , 3
    Sleep 500
    WinGetPos &x, &y, &w, &h, "ahk_id " hwnd
    return { Hwnd: hwnd, Left: x, Top: y, Right: x + w, Bottom: y + h }
}

ClickAbsolute(x, y, delayMs := 500) {
    Click x, y
    Sleep delayMs
}

ClickBattleNetLogin(rect) {
    width := rect.Right - rect.Left
    height := rect.Bottom - rect.Top
    x := rect.Left + Round(width * 0.618)
    y := rect.Top + Round(height * 0.395)
    ClickAbsolute(x, y, 1500)
}

GetCommanderIndex(name) {
    path := A_ScriptDir "\..\tools\launcher_mpq\Base.SC2Data\GameData\UserData.xml"
    if !FileExist(path)
        return ""

    xml := FileRead(path, "UTF-8")
    if RegExMatch(xml, 's)<String String="' name '">\s*<Field Id="Commander"(?: Index="(\d+)")?/>', &m) {
        return m[1] != "" ? (m[1] + 0) : 0
    }

    return ""
}

GetCommanderButtonPoint(rect, index) {
    commanderXs := [168, 266, 364, 462, 560, 658, 756, 854, 952]
    commanderYs := [322, 421]
    col := Mod(index, 9)
    row := Floor(index / 9)

    if (row >= commanderYs.Length)
        throw Error("Commander row out of range: " row)

    return [rect.Left + commanderXs[col + 1], rect.Top + commanderYs[row + 1]]
}

GetTopBarButtonPoint(rect, index) {
    width := rect.Right - rect.Left
    x := rect.Left + Round(width * (0.455 + (0.075 * index)))
    y := rect.Top + Round((rect.Bottom - rect.Top) * 0.04)
    return [x, y]
}

GetCommandCardPoint(rect, slot) {
    width := rect.Right - rect.Left
    height := rect.Bottom - rect.Top
    baseX := rect.Left + Round(width * 0.805)
    baseY := rect.Top + Round(height * 0.82)
    col := Mod(slot - 1, 4)
    row := Floor((slot - 1) / 4)
    stepX := Round(width * 0.034)
    stepY := Round(height * 0.06)
    return [baseX + (stepX * col), baseY + (stepY * row)]
}

GetMapButtonPoint(rect, index) {
    if (index < 1)
        throw Error("Map index must be >= 1.")

    mapXs := [328, 647, 965, 1283, 1601]
    mapYs := [461, 630, 768, 906, 1045, 1182]
    col := Mod(index - 1, mapXs.Length)
    row := Floor((index - 1) / mapXs.Length)

    if (row >= mapYs.Length)
        throw Error("Map row out of range: " row)

    return [rect.Left + mapXs[col + 1], rect.Top + mapYs[row + 1]]
}

GetDifficultyButtonPoint(rect, index := 0) {
    if (index < 0 || index > 3)
        throw Error("Difficulty index must be between 0 and 3.")

    x := rect.Right - 100 - 520 + 39 + 50 + (114 * index)
    y := rect.Top + 430 + 25
    return [x, y]
}

WaitForLoadWindow(sinceTime, minSec, maxSec, pollIntervalSec) {
    if (maxSec < minSec)
        maxSec := minSec

    target := minSec
    if (maxSec > minSec)
        target := Random(minSec, maxSec)

    elapsed := 0
    signal := "timeout"
    latestScriptError := ""
    latestAlerts := ""

    while (elapsed < target) {
        sleepSec := Min(Max(pollIntervalSec, 1), target - elapsed)
        Sleep sleepSec * 1000
        elapsed += sleepSec

        latestScriptError := FindLatestLogSince("ScriptError.txt", sinceTime)
        if (latestScriptError) {
            signal := "script-error"
            break
        }
    }

    latestAlerts := FindLatestLogSince("Alerts.txt", sinceTime)

    return {
        TargetSec: target,
        ElapsedSec: elapsed,
        Signal: signal,
        Alerts: latestAlerts,
        ScriptError: latestScriptError,
    }
}

FindLatestLogSince(needle, sinceTime) {
    root := A_MyDocuments "\StarCraft II\GameLogs"
    if !DirExist(root)
        return ""

    latestPath := ""
    latestTime := ""
    Loop Files, root "\*", "FR" {
        if !InStr(A_LoopFileName, needle)
            continue

        modTime := FileGetTime(A_LoopFileFullPath, "M")
        if (modTime < sinceTime)
            continue

        if (latestPath = "" || modTime > latestTime) {
            latestPath := A_LoopFileFullPath
            latestTime := modTime
        }
    }

    return latestPath
}

Log(msg) {
    global gRunLogPath
    FileAppend(msg "`n", "*")
    FileAppend(msg "`n", gRunLogPath, "UTF-8")
}
