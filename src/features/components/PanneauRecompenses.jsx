export default function PanneauRecompenses() {
    const recompenses = [
        {
            id: 1,
        },
        {
            id: 2
        }
    ]
    return (
        <div>
            {
                recompenses.map((recompense, index) => {
                    return(
                        <div key={index}>Jour n° {recompense.id} </div>
                    )
                })
            }
        </div>
    )
}