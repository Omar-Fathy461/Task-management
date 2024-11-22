import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../auth/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

function Register() {
    const initialValues = {
        fname: "",
        lname: "",
        email: "",
        password: ""
    };

    const validationSchema = Yup.object({
        fname: Yup.string().required("First name is required"),
        lname: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

    const handleRegister = async (values, { setSubmitting }) => {
        try {
            await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = auth.currentUser;
            console.log(user);
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: values.fname,
                    lastName: values.lname
                });
            }
            console.log("User registered successfully");
            toast.success("User registered successfully", { position: "top-right", theme: "dark" });
        } catch (error) {
            toast.error(error.message, { position: "top-right", theme: "dark" });
            console.log(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="max-w-md border border-gray-300 rounded-lg signUpModal p-4 m-auto w-full items-center" color="transparent" shadow={false}>
                <Typography className="text-center" variant="h4" color="blue-gray">
                    Register
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    {({ isSubmitting }) => (
                        <Form className="mt-5 mb-2 w-80 max-w-screen-lg sm:w-96">
                            <div className="mb-1 flex flex-col gap-6">
                                <Typography variant="h6" color="blue-gray" className="-mb-4">
                                    First Name
                                </Typography>
                                <Field
                                    name="fname"
                                    as={Input}
                                    size="lg"
                                    type="text"
                                    placeholder="First Name"
                                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                />
                                <Typography variant="h6" color="blue-gray" className="-mb-4">
                                    Last Name
                                </Typography>
                                <Field
                                    name="lname"
                                    as={Input}
                                    size="lg"
                                    type="text"
                                    placeholder="Last Name"
                                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                />
                                <Typography variant="h6" color="blue-gray" className="-mb-4">
                                    Email
                                </Typography>
                                <Field
                                    name="email"
                                    as={Input}
                                    size="lg"
                                    type="email"
                                    placeholder="Email address"
                                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                />
                                <Typography variant="h6" color="blue-gray" className="-mb-4">
                                    Password
                                </Typography>
                                <Field
                                    name="password"
                                    as={Input}
                                    size="lg"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                />
                            </div>
                            <Button type="submit" color="blue" disabled={isSubmitting} className="mt-10 bg-black font-semibold btn" fullWidth>
                                Register
                            </Button>
                            <Typography color="gray" className="mt-4 text-center font-normal">
                                Already have an account?
                                <Link to="/login" className="font-medium text-gray-900">  Login</Link>
                            </Typography>
                        </Form>
                    )}
                </Formik>
            </Card>
        </div>
    );
}

export default Register;
