
function Profile() {
    return (
        <section id="profile-section">
            <div className="title">
                <h2>User Profile</h2>
            </div>
            <div id="profile">

            </div>
            <div className="back">
                <button type="button" id="profileback" onClick={() => history.back()}>Back</button>
            </div>
        </section>

    )
}

export default Profile
