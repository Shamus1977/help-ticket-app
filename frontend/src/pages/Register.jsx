import  React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom"
//Redux
// useSelector lets you select items in the global state
// useDipatch letsyou dispatch.
import {useSelector, useDispatch} from "react-redux";
import {register, reset} from "../features/auth/authSlice";
//END Redux
import {toast} from "react-toastify";
import {FaUser} from "react-icons/fa";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const {name, email, password, password2} = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // name should match name given to the object in the
    // createSlice function used in the slice file. in this 
    // case authSlice hense the "state.auth"
    const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth);

    useEffect(() => {

        //If error send error toast
        if(isError){
            toast.error(message);
        }

        //Redirect when logged in
        if(isSuccess || user){
            navigate("/");
        }

        dispatch(reset());
    },[isError, isSuccess, user, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData( (prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if(password !== password2){
            toast.error("Passwords do not match.");
        }else{
            const userData = {
                name,
                email,
                password,
            };

            // REDUX: dispatches the register function from the authSlice
            dispatch(register(userData));
        }
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please Create An Account.</p>
            </section>
            <section className='form' >
                <form onSubmit={onSubmit} >
                    <div className='form-group' >
                        <input type="text" className='form-control' 
                            id="name" name="name" value={name} onChange={onChange}
                            placeholder="Enter Your Name"
                            required
                        />
                    </div>
                    <div className='form-group' >
                        <input type="email" className='form-control' 
                            id="email" name="email" value={email} onChange={onChange}
                            placeholder="Enter Your Email"
                            required
                        />
                    </div>
                    <div className='form-group' >
                        <input type="password" className='form-control' 
                            id="password" name="password" value={password} onChange={onChange}
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>
                    <div className='form-group' >
                        <input type="password" className='form-control' 
                            id="password2" name="password2" value={password2} onChange={onChange}
                            placeholder="Re-Enter Password To Verify It Matches"
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-block' >Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Register;
