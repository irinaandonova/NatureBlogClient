import { useState } from 'react';

const HikingTrail = (prop) => {
    const [duration, setDuration] = useState(0);
    const [difficulty, setDifficulty] = useState(1);

    return (
        <article className="category-info">
            <label className="category-label">Hiking Duration:</label>
            <input name="hiking-duration" onChange={(e) => {

                prop.addInfo({ duration: Number(e.currentTarget.value), difficulty });
                setDuration(Number(e.currentTarget.value))
            }} />
            <select name="hiking-difficulty" onChange={(e) => {
                prop.addInfo({ duration, difficulty: Number(e.currentTarget.value) })
                setDifficulty(Number(e.currentTarget.value))
            }}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </article>
    );
}

export default HikingTrail;