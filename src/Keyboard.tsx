import styles from "./Keyboard.module.css";

const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
]

type KeyboardProps = {
    activeLetters: string[],
    onLetterClick: Function,
    inActiveLetters: string[],
    disabled?: boolean,
}


export function Keyboard({ activeLetters, inActiveLetters, onLetterClick, disabled=false }: KeyboardProps) {

    return (
        <div className={styles.keyboard}>
            {KEYS.map((key: string) => {

                const isActive:boolean = activeLetters.includes(key);
                const isInactive:boolean = inActiveLetters.includes(key);

                return (
                    <button
                        className={`${styles.btn} ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""}`} 
                        key={key}
                        onClick={() => onLetterClick(key)}
                        disabled={isActive || isInactive || disabled }
                    >
                        {key}
                    </button>
                )
            })}
        </div>
    )
}