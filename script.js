let clickCount = 0;
let clickTimeout;
let initialX, initialY;

function setInitialPosition(element, xPercent, yPercent) {
    const desktopWidth = document.getElementById('desktop').offsetWidth;
    const desktopHeight = document.getElementById('desktop').offsetHeight;

    const x = (xPercent / 100) * desktopWidth;
    const y = (yPercent / 100) * desktopHeight;

    element.style.left = x + 'px';
    element.style.top = y + 'px';
}

setInitialPosition(document.getElementById('trash'), 90, 83);
setInitialPosition(document.getElementById('bug-icon'), 90, 71);
setInitialPosition(document.getElementById('folder1'), 3, 5);
setInitialPosition(document.getElementById('folder2'), 10, 5);
setInitialPosition(document.getElementById('explorer-icon'), 2.5, 35);
setInitialPosition(document.getElementById('mozilla-icon'), 3, 47);
setInitialPosition(document.getElementById('gadu-icon'), 3, 59);
setInitialPosition(document.getElementById('mycomp-icon'), 3, 83);
setInitialPosition(document.getElementById('o_mnie'), 17, 4.5);
setInitialPosition(document.getElementById('dostepnosc'), 24, 4.5);

let folderModal;
let errorModal;

function openFolder(folderName, contentModal) {
    folderModal = new Modal({
        content: `
             <div class="windows-xp-modal">
                <div class="modal-header">
                    <span class="close-btn" onclick="folderModal.close()"><img width="30px" src="close.png" alt="X"></span>
                </div>
                <ul>
                    ${contentModal}
                </ul>
            </div>
                          
        `,
        width: '40%',
    });

    folderModal.open();
}


function openFile(fileName) {
    // Do something when a file is clicked (e.g., open the file)
    alert(`Opening file: ${fileName}`);
}

function startDrag(e, id) {
    clickCount++;

    if (clickCount === 1) {
        initialX = e.clientX;
        initialY = e.clientY;
    }

    clickTimeout = setTimeout(() => {
        clickCount = 0;
    }, 300);

    e.preventDefault();

    const icon = document.getElementById(id);
    const offsetX = e.clientX - icon.getBoundingClientRect().left;
    const offsetY = e.clientY - icon.getBoundingClientRect().top;


    function dragMove(e) {
        icon.style.left = e.clientX - offsetX + 'px';
        icon.style.top = e.clientY - offsetY + 'px';
    }

    function dragEnd(e) {
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('mouseup', dragEnd);

        // Calculate the distance moved during drag
        const distance = Math.sqrt(
            Math.pow(e.clientX - initialX, 2) +
            Math.pow(e.clientY - initialY, 2)
        );

        // If the distance is small, consider it a click
        if (distance < 5) {
            clickCount = 0;
        } else {
            // Check if the dropped position is within the bounds of the trash icon
            const trash = document.getElementById('trash');
            const trashRect = trash.getBoundingClientRect();

            // Get the position where the item was dropped
            const x = e.clientX;
            const y = e.clientY;

            // Check if the dropped position is within the bounds of the trash icon
            if (
                x >= trashRect.left &&
                x <= trashRect.right &&
                y >= trashRect.top &&
                y <= trashRect.bottom
            ) {
                // Show the modal with the warning text
                alert(`HEJ! Nie wyrzucaj tego...`);
                icon.style.left = initialX + 'px';
                icon.style.top = initialY + 'px';


            }
        }
    }

    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
}


function attemptLogin() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    if (usernameInput === 'jebac' && passwordInput.toLowerCase() === 'bhc') {
        window.location.href = 'desktop.html'
    } else if ((usernameInput === 'jebac' && passwordInput.toLowerCase() === 'bit') || (usernameInput === 'jebac' && passwordInput.toLowerCase() === 'bita')) {
        document.getElementById('login-message').innerText = 'nie no nie żartuj sobie tak';
    } else {
        document.getElementById('login-message').innerText = 'think. again.';
    }
}

let folderSuki = `
    <li onclick="openFile('motywacja.doc')">
        <div class="file" id="file1" >
            <img src="word.png" alt="word">
            <span>motywacja.doc</span>
        </div>
    </li>
    <li onclick="openFile('doświadczenie.doc')">
        <div class="file" id="file2" >
            <img src="word.png" alt="word">
            <span>doswiadczenie.doc</span>
        </div>
    </li>
`;

let folderAppa = `
    <li onclick="openFile('motywacja.doc')">
        <div class="file" id="file3" >
            <img src="word.png" alt="word">
            <span>motywacja.doc</span>
        </div>
    </li>
    <li onclick="openFile('doświadczenie.doc')">
        <div class="file" id="file4" >
            <img src="word.png" alt="word">
            <span>doswiadczenie.doc</span>
        </div>
    </li>
`;
let folderTrash = `
    <li onclick="openFile('motywacja.doc')">
        <div class="file" id="file3" >
            <img src="jpg.ico" alt="word">
            <span>na_pewno_nie_stopy.jpg</span>
        </div>
    </li>
`;


function openShortcut(shortcutName) {
    errorModal = new Modal({
        content: `
                <div class="windows-xp-modal">
                <div class="modal-header" >
                    <span class="close-btn" onclick="errorModal.close()"><img width="30px" src="close.png" alt="X"></span>
                </div>
                    <p style="margin-left: 10px">Shortcut not working...</p>. 
                    <img alt='sad_computer' src="computer_sad.jpeg" width="280px" height="auto" style="margin-left: 10px">
                    <p style="margin-left: 10px"> Please reboot your system.</p>
                </div>
            `,
        width: '300px'
    });

    errorModal.open();
}

let welcomeModal;
function openWelcomeModal() {
    welcomeModal = new ModalPink({
        content: `
             <div class="windows-xp-modal-pink">
                <div class="modal-header-pink">
                    <span class="close-btn" onclick="welcomeModal.close()"><img width="30px" src="close.png" alt="X"></span>
                </div>
                <ul>
                    <div class="pretty-format">
    <p class="big-pink-text">Witaj w mojej apce!</p>
    <p class="black-normal-text">Czuj się jak u siebie <3 Foldery i pliki zachowują się bardzo podobnie jak zwykle.
    Apka zrobiona jest w stylu Windows XP -  a czemu? Tego już dowiedz się sam* :P Jak już pewnie zauważył*ś jest tutaj trochę easter eggów,
    ale jak już serio nie wiesz o co chodzi to kliknij w 'Report a bug' i zadaj pytanie.
    </p>
    <p style="text-align: left">Nie no joke, to nie działa XD Napisz just do mnie XD</p>
    <p style="text-align: left; color: hotpink">Julia</p>
    <p style="text-align: left; font-size: 12px">PS: Otwierasz dwuklikiem</p>
</div>
                </ul>
            </div>
                          
        `,
        width: "30%",
    });

    welcomeModal.open();
}

let bugModal;

function openBugModal() {
    bugModal = new Modal({
        content: `
                <div class="windows-xp-modal">
                <div class="modal-header">
                    <span class="close-btn" onclick="bugModal.close()"><img width="30px" src="close.png" alt="X"></span>
                </div>
                <div style="padding: 5px">
                    <textarea placeholder="Describe the bug..." id="bug-description" rows="25" cols="45"></textarea>
                    <button class = "ok-btn" onclick="sendBug()">Send</button>
</div>
                   
                </div>
            `,
        width: '400px'
    });

    bugModal.open();
}


function sendBug() {
    // Send email logic (this is just a placeholder)
    alert('Bug report sent!');

    // Close the modal
    bugModal.close()
}



let secretModal;
function openSecretModal() {
    secretModal = new ModalPink({
        content: `
             <div class="windows-xp-modal-pink">
                <div class="modal-header-pink">
                    <span class="close-btn" onclick="secretModal.close()"><img width="30px" src="close.png" alt="X"></span>
                </div>
                <ul>
                    <div class="pretty-format">
    <p class="big-pink-text">Nie mogło być inaczej</p>
    <p class="black-normal-text">Apka zrobiona została w stylu Windowsa XP, a motywem CT jest Avatar - co jest?
    Te dwie rzeczy mają ze sobą wiele wspólnego, bo Windows XP (Professional, ale kto by tam patrzył na szczegóły) wyszedł
    w tym samym roku (2005) co pierwszy odcinek Avatar: The Last Airbender! Dlatego jednym z moich pierwszych wspomnień z dzieciństwa
    było właśnie oglądanie gdzieś nagranych na DVD odcinków na starym kompie w Windowsem XP.
    </p>
</div>
                </ul>
            </div>
                          
        `,
        width: "30%",
    });

    secretModal.open();
}