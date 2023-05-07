import React, { useEffect } from 'react'
import Layout from './Layout'
import FormEditUser from '../components/FormEditUser'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/authSlice'

const EditUser = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state => state.auth));

    useEffect(() => {
            dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if(isError){
            navigate("/");
        }
    }, [isError, navigate]);

    return (
        <Layout>
            <FormEditUser/>
        </Layout>
    )
}

export default EditUser