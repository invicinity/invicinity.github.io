export const email = "invicinityofsorrow@gmail.com";
export const linkedinURL = "https://www.linkedin.com/in/nemaniaon/";
export const githubURL = "https://github.com/invicinity/invicinity.github.io";

// Banner text ascii art

export const intro1 = `

Invicinity Terminal v4.1.9 - Secure Terminal Access
____________________________________________________________________________________________________

System Check: 384400 KB ..................................................................... [ OK ]

Initializing diagnostics...

Checking Terminal Core Services:
  - Display Driver Loaded ................................................................... [ OK ]
  - Secure Input Channel Active ............................................................. [ OK ]
  - Network Adapter: EthernetyLink 10/100 Detected .......................................... [ OK ]

Running Post-Launch Diagnostics:
  - Kernel Self-Check: PASSED ............................................................... [ OK ]
  - Device Status Check:
        - Keyboard: Detected ................................................................ [ OK ]
        - Mouse: Not Detected ............................................................... [ ERROR ]
        - CD Drive: Not Functioning ......................................................... [ ERROR ]
        - Floppy Drive: Detected ............................................................ [ OK ]
        - Speakers: Detected ................................................................ [ OK ]
        - Camera: Missing ................................................................... [ ERROR ]

Diagnostics complete.

Initializing System Modules:
  - Secure Comm Protocol Stack .............................................................. [ OK ]
  - Daemon: SentryGuard Security Active ..................................................... [ OK ]
  - Terminal Access Logger: [BOOTING] ....................................................... [ OK ]

____________________________________________________________________________________________________

Logging in...
Access Code: 50RR0W

Authentication Successful!

> Booting up terminal... [ ACCESS LEVEL: FULL ]
____________________________________________________________________________________________________
`;

export const bannerPart1 = `
Initializing Invicinity Technologies 2000 v4.1
Successully initialized - 2024 Game by Nemanja Davidovic invicinityofsorrow@gmail.com>
....................................................................................................
`;

export const bannerPart2 = `

             ██▒   █▓    ██▓    ▄████▄   ██▓ ███▄    █  ██▓   ▄▄▄█████▓   ▓██   ██▓
            ▓██░   █▒   ▓██▒   ▒██▀ ▀█  ▓██▒ ██ ▀█   █ ▓██▒   ▓  ██▒ ▓▒    ▒██  ██▒
             ▓██  █▒░   ▒██▒   ▒▓█    ▄ ▒██▒▓██  ▀█ ██▒▒██▒   ▒ ▓██░ ▒░     ▒██ ██░
              ▒██ █░░   ░██░   ▒▓▓▄ ▄██▒░██░▓██▒  ▐▌██▒░██░   ░ ▓██▓ ░      ░ ▐██▓░
               ▒▀█░     ░██░   ▒ ▓███▀ ░░██░▒██░   ▓██░░██░     ▒██▒ ░      ░ ██▒▓░
               ░ ▐░     ░▓     ░ ░▒ ▒  ░░▓  ░ ▒░   ▒ ▒ ░▓       ▒ ░░         ██▒▒▒ 
               ░ ░░      ▒ ░     ░  ▒    ▒ ░░ ░░   ░ ▒░ ▒ ░       ░        ▓██ ░▒░ 
                 ░░      ▒ ░             ▒ ░   ░   ░ ░  ▒ ░     ░          ▒ ▒ ░░   
`;

export const banner = `
....................................................................................................
    
	
Type 'help' for a list of available commands.
	 
....................................................................................................
`;

export const about = () => `
    ${getRandomSentence()}
    .......................................................................................
`;
let lastIndex = null; // Store the previous index to avoid immediate repetition

// Function to get a random sentence
function getRandomSentence() {
  const cases = [
    "Those who wander here often find themselves lost, tangled in memories not their own.",
    "Time is fragile, and what’s familiar might not always be safe.",
    "In this realm, the echoes of the past intertwine with the shadows of the present.",
    "Travelers often encounter reflections of themselves, caught in a web of forgotten dreams.",
    "Beware the path ahead; it twists through memories that can ensnare the unprepared.",
  ];

  let randomIndex;

  // Ensure the new random index is not the same as the previous one
  do {
    randomIndex = Math.floor(Math.random() * cases.length);
  } while (randomIndex === lastIndex);

  // Store the current index as the last index
  lastIndex = randomIndex;

  return cases[randomIndex]; // Return the selected case
}

export const rules = `
    - Rule 1:
	
    - Rule 2:
	
    - Rule 3:
	
    - Rule 4:
	
    - Rule 5:

    - Rule 6:
	
    - Rule 7:
	
	
    .......................................................................................
`;

export const contact = `
    * Contact Information:
        - Email: ${email}
    .......................................................................................
`;

export const demo = `
    * 
    .......................................................................................
`;

export const help = `
    * Available Commands:
      - help: Display a list of available commands.
      - date: Show the current date and time.
      - weather: Show the current weather
      - clear: Clears the terminal output.
      - random fact: Get a random fact.
      - contact: Show my contact information.
      - about: Learn more about me.
      - demo: Information about the demo.
      - rules: A set of rules...
      - theme green: Changes the terminal theme to green.
      - theme black: Changes the terminal theme to black.
    .......................................................................................
`;

export const test = `
-------------------------------------------
            .mmMMMMMMMMMmm.            
         .mmMMMMMMMMMMMMMMMMMmm.        
      .mmMMMMMMMMMMMMMMMMMMMMMMMMm.     
    ......    .............    ......   
   .......                     .......  
  ........                     ........ 
 ........                       ....... 
 .......                         .......
 ........                       ........
  ........                     ........ 
   .........                ..........  
    ....  ......         ............   
     .....               ..........     
        ........         ........       
            ....         ....       

-------------------------------------------
`;
