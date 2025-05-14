import { bubblePlot } from '../src/index.js';
import { assert } from 'chai';



describe("Tests suite", () => {

    const inputData = [
        { label: 'M1', year: '2025', locationX: 100, locationY: 400, 
            dataVisit1: 0, dataVisit2: 5, dataVisit3: 10, datavisit4: 0 }, 
            
        { label: 'M2', year: '2025', locationX: 2, locationY: 40, 
            dataVisit1: 1, dataVisit2: 2, dataVisit3: 3, datavisit4: 0 }, 

        { label: 'M3', year: '2025', locationX: 400, locationY: 400, 
            dataVisit1: 0, dataVisit2: 50, dataVisit3: 20, datavisit4: 0 }
    ]

    const settings = { noColours: 10, bubbleSizeMin: 20, bubbleSizeMax: 40 } 

    })
