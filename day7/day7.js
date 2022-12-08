const example = '$ cd /\n' +
    '$ ls\n' +
    'dir a\n' +
    '14848514 b.txt\n' +
    '8504156 c.dat\n' +
    'dir d\n' +
    '$ cd a\n' +
    '$ ls\n' +
    'dir e\n' +
    '29116 f\n' +
    '2557 g\n' +
    '62596 h.lst\n' +
    '$ cd e\n' +
    '$ ls\n' +
    '584 i\n' +
    '$ cd ..\n' +
    '$ cd ..\n' +
    '$ cd d\n' +
    '$ ls\n' +
    '4060174 j\n' +
    '8033020 d.log\n' +
    '5626152 d.ext\n' +
    '7214296 k';

const splitInput = example.split('\n');

const createTree = (input) => {
    const tree = {
        name: '/',
        isDirectory: true,
        children: [],
    };

    let currentDirectory = tree;
    let currentCommand = null;

    for (let line of input) {
        let splitLine = line.split(' ');

        switch (splitLine[0]) {
            case '$': // command
                currentCommand = splitLine[1];
                if (currentCommand === 'cd') {
                    switch (splitLine[2]) {
                        case '..':
                            currentDirectory = currentDirectory.parent;
                            break;
                        case '/':
                            currentDirectory = tree;
                            break;
                        default:
                            currentDirectory = currentDirectory.children.find(child => child.name === splitLine[2]);
                            break;
                    }
                }
                break;
            case 'ls':
                if (!isNaN(splitLine[0])) {
                    //File
                    currentDirectory.children.push({
                        name: splitLine[1],
                        isDirectory: false,
                        parent: currentDirectory,
                        size: parseInt(splitLine[0]),
                    });
                } else {
                    //Directory
                    currentDirectory.children.push({
                        name: splitLine[1],
                        isDirectory: true,
                        parent: currentDirectory,
                        children: [],
                    });
                }
                break;
        }
    }
    return tree;

};




const fileTree = createTree(splitInput);
console.log( fileTree );
