import { render, screen, cleanup, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../components/App/App";
import SignIn from '../components/SignIn/SignIn';

describe('signin tests', () => {

    const initializeLogin = () => {
        const handleSubmit = jest.fn();
        const { view } = render(<SignIn onSubmit={handleSubmit} />);
        const username = screen.getByRole('textbox', { name: /username/i });
        const password = screen.getByLabelText(/password/i);
        const submitBtn = screen.getByRole('button', { name: /submit/i });
        return { username, password, submitBtn, handleSubmit };
    }

    const initializeApp = () => {
        const { view } = render(<App />);
        const username = screen.getByRole('textbox', { name: /username/i });
        const password = screen.getByLabelText(/password/i);
        const submitBtn = screen.getByRole('button', { name: /submit/i });
        return { username, password, submitBtn };
    }

    it('displays all form elements', () => {
        const { username, password, submitBtn } = initializeLogin();
        expect(username).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(submitBtn).toBeInTheDocument();
    });

    it('username/password cannot be empty', () => {
        const { username, password, submitBtn, handleSubmit } = initializeLogin();
        userEvent.type(username, 'john');
        userEvent.type(password, 'Abc@123');
        userEvent.click(submitBtn);
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(username).toHaveValue('john');
        expect(password).toHaveValue('Abc@123');
    });

    it('btn shows loader when clicked', async () => {
        const { username, password, submitBtn } = initializeApp();
        userEvent.type(username, 'john');
        userEvent.type(password, 'Abc@123');
        userEvent.click(submitBtn);
        await waitFor(() => {
            screen.getByAltText('loader');
        })
        await waitForElementToBeRemoved(screen.queryByAltText('loader'), { timeout: 5000 }).then(() => {
            expect(screen.getByText(/john/i)).toBeInTheDocument();
        });
    });

    it('invalid signin credentials case', async () => {
        const { username, password, submitBtn } = initializeApp();
        userEvent.type(username, 'john');
        userEvent.type(password, 'qwerty');
        userEvent.click(submitBtn);
        await waitFor(() => {
            expect(screen.queryAllByText(/Either username or password incorrect/i))
        })
    });


})