import './Controls.css'

const Controls = () => {
    return (
        <div className='controls-wrapper'>
            <p className='control'>
                &lt;: move left hand left <br></br>
                &gt;: move right hand right <br></br>
                ,: move left hand right <br></br>
                .: move right hand left
            </p>
        </div>
    )
}

export default Controls