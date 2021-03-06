const e = React.createElement;
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password:'',
            passwordConfirm:''
        }
    }

    // Pushes through user details to api and direct the user to 
    registerHandleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.id]: event.target.value
        })
        if(this.state.password != this.state.passwordConfirm) {
            // alert('Passwords do not match');
            document.getElementById("Login-Error").classList.remove("hideLoginError");
        }
        else {
            const data = new FormData(event.target);
            console.log(stringifyFormData(data));
            fetch('/api/user/registration', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: stringifyFormData(data),
            }).then(window.location.href = '/login?code=successful');
        }
    }

    // Checks if the password the user entered matches the cornfirm password
    updateUpdatePassword = (event) => {
        event.preventDefault();
        if(this.state.password != this.state.passwordConfirm) {
            event.target.setCustomValidity("Passwords do not match"); 
        }
        else {
            event.target.setCustomValidity("");
        }
    }

    updateInput = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.id]: event.target.value
        })
        console.log(this.state)
    }

    render() {
        return(
            <div>
                <form onSubmit = {this.registerHandleSubmit} onChange={this.updateInput}>
                    <input type="text" id="fName" name="fName" required="required" placeholder="First Name" />
                    <input type="text" id="lName" name="lName" required="required" placeholder="Last Name" />
                    <input type="date" id="dob" name="dob" required="required" placeholder="Date of Birth" />
                    <input type="email" id="email" name="email" required="required" placeholder="Email" autocomplete="off"/>
                    <input type="password" id = "password" name="password" required="required" placeholder="Password" autocomplete="off"/>
                    <input type="password"  id = "passwordConfirm" name="passwordConfirm" required="required" placeholder="Confirm your password"/>
                    <div id="Login-Error" class="showLoginError hideLoginError">
                        <h6>Incorrect username or password</h6>
                    </div>
                    <input type="submit" className="button" value="Register"/>
                </form>
            </div>
        );
    }
}
const windowElement = document.getElementById('RegisterForm');
ReactDOM.render(e(Register),windowElement);

function stringifyFormData(fd) {
    const data = {};
    for (let key of fd.keys()) {
        data[key] = fd.get(key);
    }
    return JSON.stringify(data, null, 2);
}