const figure = {
    HEAD: (<div key={1} className="head"/>),
    BODY: (<div key={2} className="body"/>),
    LEFTARM: (<div key={3} className="leftArm"/>),
    RIGHTARM: (<div key={4} className="rightArm"/>),
    LEFTLEG: (<div key={5} className="leftLeg"/>),
    RIGHTLEG: (<div key={6} className="rightLeg"/>),
}

const BODY_PARTS = [
    figure.HEAD,
    figure.BODY,
    figure.LEFTARM,
    figure.RIGHTARM,
    figure.LEFTLEG,
    figure.RIGHTLEG,
]

type HangmanDrawingProps = {
    numberOfGuesses: number,
}

export function HangmanDrawing({numberOfGuesses}:HangmanDrawingProps) {

    return (
        <div style={{ position: "relative" }}>
            {BODY_PARTS.slice(0, numberOfGuesses)}
            <div className="dropdownBar" />
            <div className="topBar" />
            <div className="middleBar" />
            <div className="bottomBar" />
        </div>
    )
}