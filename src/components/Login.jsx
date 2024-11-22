import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const Login = () => {
    const initialValues = {
        email: "",
        password: ""
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
            console.log("User Logged in Successfully");
            window.location.href = '/main';
            toast.success("User Logged in Successfully", { position: "top-right", theme: 'dark' });
        } catch (error) {
            toast.error("Invalid email or password !", { position: "top-right", theme: 'dark' });
            console.log(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="loginModal max-w-md border border-gray-300 rounded-lg  p-4 m-auto w-full items-center" color="transparent" shadow={false}>
                <Typography className='text-center' variant="h4" color="blue-gray">
                    Login
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="mt-5 mb-2 w-80 max-w-screen-lg sm:w-96">
                            <div className="mb-1 flex flex-col gap-6">
                                <Typography variant="h6" color="blue-gray" className="-mb-4">
                                    Your Email
                                </Typography>
                                <Field
                                    name="email"
                                    as={Input}
                                    type="email"
                                    size="lg"
                                    placeholder="Email address"
                                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                />
                                <Typography variant="h6" color="blue-gray" className="-mb-4">
                                    Password
                                </Typography>
                                <Field
                                    name="password"
                                    as={Input}
                                    type="password"
                                    size="lg"
                                    placeholder="********"
                                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                />
                            </div>
                            <Button type="submit" disabled={isSubmitting} className="mt-10 bg-black font-semibold btn" fullWidth>
                                {isSubmitting ? "Logging in..." : "Login"}
                            </Button>
                            <Typography color="gray" className="mt-4 text-center font-normal">
                                Don't have an account?{" "}
                                <Link to="/Register" className="font-medium text-gray-900">
                                    Sign Up
                                </Link>
                            </Typography>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    );
};

export default Login;
