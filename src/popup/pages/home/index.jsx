import { useNavigate } from 'react-router-dom'
import { Card, List } from 'antd'
import {
    PlusCircleOutlined,
    CreditCardOutlined,
    SettingOutlined,
} from '@ant-design/icons'
import './home.styl'

const menuItems = [
    {
        key: 'new-flashcard',
        icon: <PlusCircleOutlined />,
        label: 'New Flashcard',
        path: '/new-flashcard',
    },
    {
        key: 'card-deck',
        icon: <CreditCardOutlined />,
        label: 'Card Deck',
    },
    {
        key: 'settings',
        icon: <SettingOutlined />,
        label: 'Settings',
    },
]

function Home() {
    const navigate = useNavigate()

    const handleMenuClick = (item) => {
        if (item.path) {
            navigate(item.path)
            return;
        }
        if (item.key === 'settings') {
            const settingsUrl = chrome.runtime.getURL('settings.html')
            chrome.tabs.create({ url: settingsUrl })
            return;
        }
        if (item.key === 'card-deck') {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const activeTab = tabs[0];
                if (activeTab && activeTab.id) {
                    chrome.tabs.sendMessage(activeTab.id, {
                        action: "toggleSidebar"
                    });
                }
            });
        }
    }

    return (
        <div className="P-home">
            <Card title="StudySmart" bordered={false} style={{ width: 240 }}>
                <List
                    dataSource={menuItems}
                    renderItem={(item) => (
                        <List.Item
                            className="menu-item"
                            onClick={() => handleMenuClick(item)}
                        >
                            <List.Item.Meta
                                avatar={item.icon}
                                title={item.label}
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    )
}

export default Home