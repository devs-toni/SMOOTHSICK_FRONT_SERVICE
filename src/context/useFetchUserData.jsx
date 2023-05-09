import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'
import { HOME, LOGIN } from '../router/paths'
import Swal from 'sweetalert2'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export const useFetchUserData = () => {
    const { authState, logout } = useAuth()
    const { user } = authState
    const { email, userName, id } = user
    const navigate = useNavigate()
    const [ReqAccepted, setReqAccepted] = useState(Boolean)

    // DELETE USER

    const deleteUser = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            iconColor: '#ef5567',
            showCancelButton: true,
            background: '#18181b',
            confirmButtonColor: '#1a1e20',
            cancelButtonColor: '#ef5567',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(`${import.meta.env.VITE_DB_URI_DELETE_USER}/${id}`,)
                        .then(({ status }) => {
                            if (status === 201) {
                                Swal.fire({
                                    title: 'Deleted!',
                                    text: "Your account has been deleted!",
                                    icon: 'success',
                                    background: '#18181b',
                                }
                                )
                                logout()
                                navigate(HOME)
                            }
                        })
                } catch (error) {
                    console.error(error);
                }
            }
        })
    }

    //CHECK CURRENT PASS 

    const checkCurrentPass = async (currentPass) => {
        if (currentPass) {
            try {
                axios.post(import.meta.env.VITE_BACKEND + "users/validatePassword", { currentPass, id })
                    .then(({ status }) => {
                        if (status === 201) {
                            toast.success("Passwords cheked!", {
                                style: {
                                    borderRadius: "10px",
                                    background: "#333",
                                    color: "#fff",
                                },
                                error: {
                                    duration: 5000,
                                },
                            });
                            setReqAccepted(true)
                        } else {
                            toast.error("Incorrect password", {
                                style: {
                                    borderRadius: "10px",
                                    background: "#333",
                                    color: "#fff",
                                },
                                error: {
                                    duration: 5000,
                                },
                            });

                        }
                    })
            } catch (error) {
                console.error(error);
            }
        }
    }

    //SAVE NEW PASS

    const saveNewPass = async (pass, repeatPass) => {
        if (pass === repeatPass) {
            try {
                axios.patch(import.meta.env.VITE_BACKEND + "users/changePassword", { pass, id })
                    .then(({ status }) => {
                        if (status === 201) {
                            toast.success("Password changed successfully", {
                                style: {
                                    borderRadius: "10px",
                                    background: "#333",
                                    color: "#fff",
                                },
                                error: {
                                    duration: 5000,
                                },
                            });
                            setReqAccepted(true)
                        }
                    })
            } catch (error) {
                console.error(error);
            }
        } else {
            toast.error("Passwords do not match", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
                error: {
                    duration: 5000,
                },
            });
            setReqAccepted(false)
        }

    }


    // CHANGE USER NAME

    const changeUserName = async (data) => {
        const { type } = data
        try {
            axios.patch(import.meta.env.VITE_DB_URI_CHANGE_USERNAME, { type, id })
                .then(({ status }) => {
                    if (status === 201) {
                        toast.success("New user name saved!", {
                            style: {
                                borderRadius: "10px",
                                background: "#333",
                                color: "#fff",
                            },
                            error: {
                                duration: 5000,
                            },
                        });
                        
                    }
                })
        } catch (error) {
            console.error(error);
        }
    }

    // CHANGE USER EMAIL
    const changeUserEmail = async (data) => {
        const { type } = data
        try {
            axios.patch(import.meta.env.VITE_DB_URI_CHANGE_EMAIL, { type, id })
                .then(({ status }) => {
                    if (status === 201) {
                        toast.success("New user email saved!", {
                            style: {
                                borderRadius: "10px",
                                background: "#333",
                                color: "#fff",
                            },
                            error: {
                                duration: 5000,
                            },
                        });
                        
                    }
                })
        } catch (error) {
            console.error(error);
        }
    }





    return {
        ReqAccepted,
        deleteUser,
        checkCurrentPass,
        saveNewPass,
        changeUserName,
        changeUserEmail
    }

}

