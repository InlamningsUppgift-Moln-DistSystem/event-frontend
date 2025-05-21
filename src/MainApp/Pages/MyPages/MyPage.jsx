import "./MyPage.css";

function MyPage() {
  return (
    <div className="my-page">
      <div className="profile-container">
        <h2 className="profile-title">My Profile</h2>
        <div className="profile-image" />

        <form className="profile-form">
          <label>
            Username
            <input type="text" placeholder="Kevin" />
          </label>
          <label>
            Email
            <input type="email" placeholder="kevin@example.com" />
          </label>
          <label>
            Password
            <input type="password" placeholder="••••••••" />
          </label>
          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default MyPage;
