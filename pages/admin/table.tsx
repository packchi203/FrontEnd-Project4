// components/AccountTable.js
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

interface Account {
    id: number;
    username: string;
    reputation: number;
    role: string;
    status: string;
  }
  

interface AccountTableProps {
    accounts: Account[];
  }

const AccountTable: React.FC<AccountTableProps> = ({ accounts }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Reputation</th>
          <th>Role</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((account) => (
          <tr key={account.id}>
            <td>{account.username}</td>
            <td>{account.reputation}</td>
            <td>{account.role}</td>
            <td>{account.status}</td>
            <td>
              <button>
                <FaEye /> {/* Icon for view detail */}
              </button>
              <button>
                <FaEdit /> {/* Icon for edit */}
              </button>
              <button>
                <FaTrash /> {/* Icon for delete */}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AccountTable;
