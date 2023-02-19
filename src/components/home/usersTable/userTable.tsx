import React, { useContext } from 'react'
import Styles from './userTable.module.scss';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getUsers, deleteUser } from '../../../constants/usersApi';
import { AppContext } from '../../../context/AppContext';
interface usersTypes {
    setEditUser: number | any
}
interface UserType {
    id: number;
    name: string;
    email: string;
    phone: string;
    password?: string;
    confirmPassword?: string;
}



const UserTable: React.FC<usersTypes> = ({ setEditUser }) => {
    const { language } = useContext(AppContext);
    const webQueryClient = useQueryClient();
    const {
        isLoading,
        data: users
    } = useQuery('users', getUsers);
    const usersData: UserType[] = users;
    const deleteMutation = useMutation(deleteUser, {
        onSuccess: () => {
            webQueryClient.invalidateQueries("users")
        }
    })

    const ScrollToEnd = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
    return (
        <div className={Styles.table}>
            {isLoading && (
                <div>
                    <h5> {language == "en" ? "... Users Data Is Loading" : 'جاري تحميل بيانات الاعضاء'}</h5>
                </div>
            )}
            {usersData && usersData.map((item) => {
                return (
                    <div className={Styles.tableRow} key={item.id}>
                        <div>
                            {item.id}
                        </div>
                        <div>
                            <h5> {item.name}</h5>
                        </div>
                        <div>
                            {item.email}
                        </div>
                        <div>
                            {item.phone}
                        </div>
                        <div className={Styles.actionBtns}>

                            <button className={Styles.edit} onClick={() => { setEditUser(item.id); ScrollToEnd(); }}> Edit</button>
                            <button className={Styles.delete} onClick={() => deleteMutation.mutate({ id: item.id })}> Delete </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default UserTable

