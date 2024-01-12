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
    <li ondblclick="openModalWithContent('Suki: Motywacja', motywacja_suki_modal)">
        <div class="file" id="file1" >
            <img src="word.png" alt="word">
            <span>motywacja.doc</span>
        </div>
    </li>
    <li ondblclick="openModalWithContent('Suki: Doświadczenie', dosiwadczenie_suki_modal)">
        <div class="file" id="file2" >
            <img src="word.png" alt="word">
            <span>doswiadczenie.doc</span>
        </div>
    </li>
`;

let folderAppa = `
    <li ondblclick="openModalWithContent('Appa: Motywacja', motywacja_appa_modal)">
        <div class="file" id="file3" >
            <img src="word.png" alt="word">
            <span>motywacja.doc</span>
        </div>
    </li>
    <li ondblclick="openModalWithContent('Appa: Doświadczenie', doswiadczenie_appa_modal)">
        <div class="file" id="file4" >
            <img src="word.png" alt="word">
            <span>doswiadczenie.doc</span>
        </div>
    </li>
`;
let folderTrash = `
    <li ondblclick="openImage('415286472_748748153362540_4200162391394381607_n.jpg')">
        <div class="file" id="file3" >
            <img src="jpg.ico" alt="word">
            <span>kotek.jpg</span>
        </div>
    </li>
    <li ondblclick="openImage('poem.jpg')">
        <div class="file" id="meme" >
            <img src="jpg.ico" alt="mem">
            <span>wierszyk_dla_ciebie.jpg</span>
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

let contentModal;
function openModalWithContent(name, content) {
    contentModal = new Modal({
        content: `
             <div class="windows-xp-modal">
                <div class="modal-header">
                    <span class="close-btn" onclick="contentModal.close()"><img width="30px" src="close.png" alt="X"></span>
                </div>
                <ul>
                    <div class="pretty-format">
                    <h1 style="font-family: 'Microsoft Sans Serif', Tahoma, Geneva, sans-serif; color: #2750b6; text-align: left">${name}</h1>
                    ${content}
                    </div>
                </ul>
            </div>
                          
        `,
        width: "50%",
    });

    contentModal.open();
}

let imageModal;
function openImage(image_path) {
    imageModal = new Modal({
        content: `
             <div class="windows-xp-modal">
                <div class="modal-header">
                    <span class="close-btn" onclick="imageModal.close()"><img width="30px" src="close.png" alt="X"></span>
                </div>
                <ul>
                    <div class="pretty-format">
                    <img src="${image_path}" alt="image" height="400px">
                    </div>
                </ul>
            </div>
                         
        `,
        width: "auto",
    });

    imageModal.open();

}


o_mnie_modal = `
<p class="black-normal-text">
No hej tu Julia! W sumie już dużo o mnie wiadomo, ale może czymś zaskoczę.
Pochodzę z małej miejscowości na śląsku o nazwie Krowiarki (już można zacząć się śmiać). W zasadzie od kiedy pamiętam angażowałam się w miejscową społeczność - organizowałam Jasełka, prowadziłam korepetycje, a przede wszystkim śpiewałam gdzie popadnie - w szkole, w kościele, na dożynkach i przeróżnych imprezach. Kiedy przyjechałam do Wrocławia pierwotnie aplikowałam do Akademii Sztuk Teatralnych, ale ostatecznie zobaczyłam, że chyba nie tędy droga i wylądowałam na Polibudzie. Przez większość czasu brakowało mi strasznie czegoś poza studiami - dlatego dołączyłam do BESTu.
Jestem już w Beście od praaawie roku (lol ten czas szybko mija).
Przez jakieś 7 miesięcy byłam grafikiem w Bicie, w międzyczasie też zostałam Vivaldim razem z Wiksą. Nienawidzę się nudzić, uwielbiam tańczyć (co już też pewnie wiadomo XD) i robić przeróżne kreatywne rzeczy. To w sumie tyle, nie będę więcej przynudzać hihi 
</p>
<p class="black-normal-text">
A gdybym żyła w świecie Avatara, byłabym magiem Ognia. Po pierwsze chciałabym wreszcie spotkać jakiegoś smoka, a teoretycznie pierwsi magowie ognia uczyli się tej sztuki od smoków. Po drugie ogień kojarzy mi się z czymś chaotycznym, pełnym energii i z ekspresyjnością - co idealnie mnie opisuje. Po trzecie jest teraz tak kurwa zimno, że magia ognia byłaby najsensowniejszym wyborem, bo nie mam zamiaru przymarznąć do siedzenia w tramwaju, a po czwarte przydałaby się bardzo w CT BITa 2023 i ogólnie w Beście ze względu na ilość palaczy XD
</p>
`;

dostepnosc_modal = `
<p class="black-normal-text">
Do lipca raczej nie planuję nigdzie znikać, na sam finał już mam zarezerwowany termin tak czy siak. Wiadomo, że tak jak połowa Bestii studiuję i pracuję, ale to już od dłuższego czasu, więc raczej nie stwarza to problemów, bo jestem na magisterce, a mój przełożony jest bardzo wyrozumiały i nie ma problemu z jakimś braniem wolnego. Telefon odbieram praktycznie za każdym razem, we Wrocławiu jestem większość swojego czasu, poza tym flexibility to moje drugie imię (w każdym tego słowa znaczeniu) <3
</p>
<img alt="creep" width="300px" height="auto" src="411455204_762173442431941_7818724159158304768_n.jpg" >
<p class="black-normal-text">
*creepy zdjęcie z jakiejś imprezy potwierdzające powyższy statement*
</p>
`;


motywacja_appa_modal = `
<p class="black-normal-text">
Do zostania Pax Respem zmotywowała mnie osoba, która pełniła właśnie tę fuszkę na kursie w LBG Tor Vergata. Tam pierwszy raz zetknęłam się z taką funkcją i od razu stwierdziłam, że to coś dla mnie. Naprawdę uwielbiam pomagać ludziom i być taką osobą, do której zawsze mogą zwrócić się po pomoc. Przyszłam do BEST-u właśnie ze względu na jego międzynarodowość i miałam to szczęście, że udało mi się jej liznąć na kursie, RM-ie i przy byciu Vivaldim. Od dnia, w którym wróciłam z kursu, wiedziałam, że właśnie to chcę w Beście robić, a na samą myśl o możliwości pracy nad najbardziej międzynarodowym projektem i o stworzeniu kursu dla 22 ludzi z całej Europy, robi mi się cieplutko na serduszku <3</p>
</p>
`

doswiadczenie_appa_modal = `
<p class="black-normal-text">
Stricte Pax Respowej fuszki nigdy nie miałam. Obyłam KT z Dawidkiem Szsz, gdzie dowiedziałam się dużo o tym jak ta fuszka wygląda, co jeszcze bardziej zachęciło mnie do aplikowania. Dawid wspomniał, że będąc dobrym Pax Respem trzeba być bardzo otwartym na innych i umieć się obchodzić z ludźmi, wydaje mi się, że to dokładnie mnie opisuje. Dołączyłam do BESTu ze względu na ludzi - mimo, że w Bicie nie byłam HR-owcem zorganizowałam u nas formsa Thank you Biciaku, który moim zdaniem wyszedł super - było w nim ponad 50 wpisów, w którym można było komuś anonimowo lub nie podziękować. Sama fuszka Vivaldiego też jest trochę HR-owa, bo często odpowiadam ludziom na wiadomości i rozwiązuję konflikty. Tak jak też wspominałam organizowałam w mojej rodzinnej wsi jasełka, co wiązało się z umiejętnościami zarządzania ludźmi (w tym wypadku wkurwiającymi gimnazjalistami). 
</p>
<p class="black-normal-text">
Z doświadczenia kursowego byłam ofc na kursie w Rzymie, i było to jedno z NAJLEPSZYCH EVER rzeczy na jakie się zdecydowałam. Poznałam mnóstwo ludzi, z którymi mam kontakt do dzisiaj i przeżyłam niesamowite przygody, o których opowiadam kiedy tylko nadarzy się okazja.
</p>
`

dosiwadczenie_suki_modal = `
<p class="black-normal-text">
Ogólnie to pogodziłam już się z tym że Adobe Illustrator to moja trzecia nerka XD Grafikowałam ofc w BIT2023, a moje wyczyny można znaleźć na fanpage'u BITa czy Instagramie no i na koszulkach czy plakatach - dla przypomnienia wyglądało to tak:
</p>
<div class="image-container">
    <img src="Screenshot%202024-01-12%20at%2022.21.02.png" alt="Image 1">
    <img src="GJ_2Obszar%20roboczy%209.png" alt="Image 2">
    <img src="370291499_900670294751071_1466325881444230987_n.png" alt="Image 3">
</div>
<p class="black-normal-text">
Grafikuję też jako Vivaldi. Tak. Robię te grafiki - no może nie wszystkie jak dostaję materiały od innych LBG, ale graficzki które zrobiłam to m.in.:
</p>
<div class="image-container">
    <img src="Screenshot%202024-01-12%20at%2021.33.02.png" alt="Image 1">
    <img src="Screenshot%202024-01-12%20at%2021.33.20.png" alt="Image 2">
    <img src="Screenshot%202024-01-12%20at%2021.33.36.png" alt="Image 3">
</div>
<p class="black-normal-text">
Po Bicie okazało się, że kurde bardzo lubię to robić i zaczęłam nawet jakoś z tym wiązać przyszłość - może nie żyć z tego no ale still… Robię też 2 kursiki na Udemy z Adobe Illustatora. Oprócz Illustratora znam trochę Photoshopa, AfterEffects no i od biedy Canvę, ale wolę jej unikać XD grafikuje też na uczelnię - robię każdą grupową prezkę, UI do apek, loga do zmyślonych firm iii dużo, dużo więcej.
</p>

`

motywacja_suki_modal = `
<p class="black-normal-text">
Myślałam, że po Bicie nie będę w stanie spojrzeć na Adobe, ale jak bardzo się myliłam XD okazało się, że zajebiście się bawiłam i była to jedna z najlepszych decyzji w moim życiu. Pewnie ktoś to czyta tę aplikację pomyśli sobie - no dobra, ale jak znowu zostaniesz Grafikiem to co z tego wyniesiesz? Przecież niczego już się nie nauczysz? Actually… Po pierwsze  grafika to taka niekończąca się historia - każdy projekt to nowe pomysły, po drugie chciałabym wykorzystać to czego się nauczyłam na Bicie i  zaaplikować to do nowej fuszki oraz zrealizować pomysły, których nie udało mi się dotychczas zrealizować. Prawda jest taka, że kocham to robić i taka praca sprawia mi mnóstwo frajdy <3 
</p>
<p class="black-normal-text">Ostatnim powodem i chyba największym są ludzie, z którymi będę mogła pracować - to ludzie motywują mnie do pracy, a szczególnie patrząc na aktualny skład CT, jeszcze bardziej chciałabym tu dołączyć. 
</p>
`