import './new-flashcard.styl'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';

function NewFlashcard() {
    const navigate = useNavigate();
    return (
        <div className="P-new-flashcard">
            <div className="page-header">
                <ArrowLeftOutlined className="back-icon" onClick={() => navigate(-1)} />
                <h1 className="page-title">New Flashcard</h1>
            </div>
        </div>
    )
}

export default NewFlashcard 