import { app, BrowserWindow, Menu, shell, dialog } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import * as fs from 'fs';
import { OptimizedMethod } from './data';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null = null;

let defaultFileName = 'xyz.json';
const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
  enableLiveReload({strategy: 'react-hmr'});
}

function openFileDialog() {
  dialog.showOpenDialog({ properties: [ 'openFile'], filters: [{ extensions: ['json'] }]}, (fileNames: string[]) => {
      if (fileNames === undefined) {
        return;
      }
      // mainWindow.close();
      createWindow(fileNames[0]);
  });
}

// initialize the menu
const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open File',
        accelerator: 'CmdOrCtrl+O',
        click: () => openFileDialog()
      },
      {role: 'quit'},
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'CACAO JVM',
        click () { shell.openExternal('https://cacaojvm.org'); }
      },
      {
        label: 'CACAO Bitbucket Repository',
        click () { shell.openExternal('https://bitbucket.org/cacaovm/'); }
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

function readMissingBrackets(data: string): string {
  const bracketsStack = [];
  let ignoreChar = false;
  for (const ch of data) {
    switch (ch) {
      case '"':
        ignoreChar = !ignoreChar;
        break;
      case '(':
      case '[':
      case '{':
        if (!ignoreChar) {
          bracketsStack.push(ch);
        }
        break;
      case ')':
      case ']':
      case '}':
        if (!ignoreChar) {
          let actualCh = bracketsStack.pop();
          if (actualCh != getMatchingBracket(ch)) {
            console.log('unexpected brackets found in json! \'' + actualCh + '\' but should have been \'' + getMatchingBracket(ch) + '\'');
            return '';
          }
        }
        break;
      default:
    }
  }
  let missingBrackets = '';
  while (bracketsStack.length > 0) {
    let missingBracket = bracketsStack.pop() as string;
    missingBrackets += getMatchingBracket(missingBracket);
  }
  return missingBrackets;
}

function getMatchingBracket(ch: string) {
  switch (ch) {
    case ')': return '(';
    case ']': return '[';
    case '}': return '{';
    case '(': return ')';
    case '[': return ']';
    case '{': return '}';
  }
  return '';
}

function readFile(fileName: string): OptimizedMethod {
  console.log('readFile: ' + JSON.stringify(fileName));
  let data = fs.readFileSync(fileName, 'utf8');
  console.log('file size: ' + data.length);
  let jsonData = '';
  try {
    jsonData = JSON.parse(data);
  } catch (e) {
    console.log('cannot read file' + e);
    // check if brackets are missing in the file, this can easily happen during
    // development, where a small error in the C++ code will result in invalid json files
    const missingBrackets = readMissingBrackets(data);
    console.log('missingBrackets: ' + missingBrackets + '; filename: ' + fileName);
    if (missingBrackets.length > 0) {
      jsonData = JSON.parse(data + missingBrackets);
    }
  }
  let optimizedMethod = new OptimizedMethod().fromJSON(jsonData);
  return optimizedMethod;
}

const createWindow = async function (fileName: string) {

  console.log('#createWindow.fileName: ' + fileName);
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'visualize CACAO JVM'
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  mainWindow.optimizedMethod = readFile(fileName);
  mainWindow.show();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => createWindow(defaultFileName));

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow(defaultFileName);
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.