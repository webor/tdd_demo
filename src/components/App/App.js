import React, { useEffect, useState, useReducer } from 'react';
import './App.css';
import SignIn from '../SignIn/SignIn';



const formSubmissionReducer = (state, action) => {
  switch (action.type) {
    case 'START': {
      return { status: 'pending', responseData: null, errorMessage: null }
    }
    case 'RESOLVE': {
      return {
        status: 'resolved',
        responseData: action.responseData,
        errorMessage: null,
      }
    }
    case 'REJECT': {
      return {
        status: 'rejected',
        responseData: null,
        errorMessage: action.error.message,
      }
    }
    default:
      throw new Error(`Unsupported type: ${action.type}`)
  }
}

const submitFormAction = (props) => {
  const [state, dispatch] = useReducer(formSubmissionReducer, {
    status: 'idle',
    responseData: null,
    errorMessage: null,
  });

  const fetchBody = props ? JSON.stringify(props) : null

  useEffect(() => {
    if (fetchBody) {
      dispatch({ type: 'START' })
      fetch('https://test_demo/api/login', {
        method: 'POST',
        body: fetchBody,
        headers: {
          'content-type': 'application/json',
        },
      })
        .then(async response => {
          const data = await response.json()
          if (response.ok) {
            dispatch({ type: 'RESOLVE', responseData: data })
          } else {
            dispatch({ type: 'REJECT', error: data })
          }
        })
    }
  }, [fetchBody])
  return state;
}

function App() {
  const [formData, setFormData] = useState(null);
  const { status, responseData, errorMessage } = submitFormAction(formData);

  return (
    <div className="App">
      {status === 'resolved' ? (
        <div>
          Welcome <strong>{responseData.username}</strong>
        </div>
      ) : (
        <SignIn status={status} onSubmit={data => setFormData(data)} />
      )}
      <div style={{ height: 200 }}>
        {status === 'rejected' ? (
          <div role="alert" style={{ color: 'red' }}>
            {errorMessage}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
