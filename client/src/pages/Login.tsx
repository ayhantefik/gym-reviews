import { useAuthService } from "../services/authService";

function Login(){
    const { handleGoogleSignIn } = useAuthService();
    return(
        <>
            <button onClick={handleGoogleSignIn}>Google login</button>
        </>
    )
}

export default Login;