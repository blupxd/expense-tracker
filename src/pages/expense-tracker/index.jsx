import {useAddTransaction} from '../../hooks/useAddTransaction'
import { useState } from 'react'
import { useGetTransactions } from '../../hooks/useGetTransactions'
import { useGetUserInfo } from '../../hooks/useGetUserInfo'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import {auth} from "../../config/firebase-config"

export const ExpenseTracker = () => {
    const { addTransaction } = useAddTransaction()
    const { transactions, transactionTotals } = useGetTransactions();
    const {name,profilePhoto } = useGetUserInfo();
    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");


    const {balance,income,expenses} = transactionTotals;

    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault()
        addTransaction({description, transactionAmount, transactionType})
    }
    const signUserOut = async () => {
        try {
            await signOut(auth)
            localStorage.clear()
            navigate("/");
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="expense-tracker">
                {profilePhoto && <div className="profile-picture">
                    <img src={profilePhoto} alt={name}/>
                </div>}
                <button className='sign-out' onClick={signUserOut}>Sign out</button>
                <div className="container">
                    <h1>{name}'s Expense Tracker</h1>
                    <div className="balance">
                        <h3>Your Balance</h3>
                        <h2>${balance}</h2>
                    </div>
                    <div className="summary">
                        <div className="income">
                            <h4>Income</h4>
                            <p>${income}</p>
                        </div>
                        <div className="expenses">
                            <h4>Expenses</h4>
                            <p>${expenses}</p>
                        </div>
                    </div>
                    <form className="add-transaction" onSubmit={onSubmit}>
                        <input type="text" placeholder="Description" required onChange={(e) => setDescription(e.target.value)}/>
                        <input type="number" placeholder="Amount" required onChange={(e) => setTransactionAmount(e.target.value)}/>
                        <input type="radio" id="expense" checked={transactionType === "expense"} value="expense" onChange={(e) => setTransactionType(e.target.value)}/>
                        <label htmlFor="expense">Expenses</label>
                        <input type="radio" id="income" checked={transactionType === "income"} value="income" onChange={(e) => setTransactionType(e.target.value)}/>
                        <label htmlFor="income">Income</label>

                        <button type="submit"> Add Transaction</button>
                    </form>
                </div>
            </div>
            <div className="transactions">
                <h3>Transactions</h3>
                <ul>
                    {transactions.map((transaction) => {
                        const {description,transactionAmount,transactionType} = transaction;
                        return (
                        <li>
                            <h4>{description}</h4>
                            <p>${transactionAmount} * <label style={{color: transactionType === "expense" ? "red" : "green"}}>{transactionType}</label></p>
                        </li>
                        )
                    })}
                </ul>
            </div>
        </>)
}