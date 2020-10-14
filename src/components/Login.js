import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
    //using useRef to get value of the input
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault();
        
        try{
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError('Failed to sign in')
        }        
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mt-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button className="w-100" disabled={loading} type="submit">Log In</Button>
                    </Form>
                </Card.Body>
                <div className="w-100 text-center mt-3">
                    <Link to="/forgot-password">Forgot Password</Link>
                </div>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account ? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}
