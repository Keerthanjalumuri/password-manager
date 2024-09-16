import './App.css'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

const PasswordItem = ({passwordItem, onDeletePasswordItem, showPasswords}) => {
  const {id, website, username, password} = passwordItem
  const isPassword = showPasswords ? (
    <p className="profile-text">{password}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="star-img"
    />
  )
  const deleteItem = () => {
    onDeletePasswordItem(id)
  }
  return (
    <li className="profile-container">
      <p className="profile">{website[0]}</p>
      <div className="profile-details-container">
        <p className="profile-text">{website}</p>
        <p className="profile-text">{username}</p>
        {isPassword}
      </div>
      <button
        type="button"
        onClick={deleteItem}
        className="delete-btn"
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

class App extends Component {
  state = {
    passwordslist: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
    showPasswords: false,
  }

  onChangewebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  addPasswordToList = event => {
    event.preventDefault()
    const {passwordslist, website, username, password} = this.state
    if (website && username && password) {
      const newPassword = {
        id: uuidv4(),
        website,
        username,
        password,
      }

      this.setState({
        passwordslist: [...passwordslist, newPassword],
        website: '',
        username: '',
        password: '',
      })
    }
  }

  handleShowPasswords = event => {
    this.setState({showPasswords: event.target.checked})
  }

  onDeletePasswordItem = id => {
    const {passwordslist} = this.state
    const filteredPasswordsList = passwordslist.filter(
      eachpassword => eachpassword.id !== id,
    )
    this.setState({passwordslist: filteredPasswordsList})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getFilterdPasswords = () => {
    const {passwordslist, searchInput} = this.state
    return passwordslist.filter(eachpassword =>
      eachpassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  renderForm = () => {
    const {website, username, password} = this.state
    return (
      <form className="form-container" onSubmit={this.addPasswordToList}>
        <h1 className="form-heading">Add New Password</h1>
        <div className="input-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
            className="input-img"
            alt="website"
          />
          <input
            type="text"
            placeholder="Enter Website"
            className="input-element"
            onChange={this.onChangewebsite}
            value={website}
          />
        </div>
        <div className="input-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
            className="input-img"
            alt="username"
          />
          <input
            type="text"
            placeholder="Enter Username"
            className="input-element"
            onChange={this.onChangeUsername}
            value={username}
          />
        </div>
        <div className="input-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
            className="input-img"
            alt="password"
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="input-element"
            onChange={this.onChangePassword}
            value={password}
          />
        </div>
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    )
  }

  renderNoPasswords = () => (
    <div className="no-passwords-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-passwords-img"
      />
      <p className="passwords">No Passwords</p>
    </div>
  )

  render() {
    const {showPasswords, searchInput} = this.state
    const filteredPasswordsList = this.getFilterdPasswords()
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="password-input-container">
          {this.renderForm()}
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-img"
          />
        </div>
        <div className="password-items-container">
          <div className="password-header">
            <div className="password-count-card">
              <h1 className="password-count">Your Passwords</h1>
              <p className="count">{filteredPasswordsList.length}</p>
            </div>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-img"
              />
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="horizental-line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkbox"
              checked={showPasswords}
              onChange={this.handleShowPasswords}
            />
            <label htmlFor="checkbox" className="label-element">
              Show Passwords
            </label>
          </div>
          <div>
            {filteredPasswordsList.length === 0 ? (
              this.renderNoPasswords()
            ) : (
              <ul className="passwords-container">
                {filteredPasswordsList.map(eachpassword => (
                  <PasswordItem
                    key={eachpassword.id}
                    passwordItem={eachpassword}
                    onDeletePasswordItem={this.onDeletePasswordItem}
                    showPasswords={showPasswords}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
