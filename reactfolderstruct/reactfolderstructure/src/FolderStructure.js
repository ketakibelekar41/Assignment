import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const FolderStructure = () => {
    const [openFolders, setOpenFolders] = useState({});

    const [folders] = useState([
        {
            id: "1",
            name: "Documents",
            children: [
                { id: "1.1", name: "Document1.jpg", type: 'image' },
                { id: "1.2", name: "Document2.jpg", type: 'image' },
                { id: "1.3", name: "Document3.jpg", type: 'image' },
            ],
        },
        {
            id: "2",
            name: "Desktop",
            children: [
                { id: "2.1", name: "Screenshot1.jpg", type: 'image' },
                { id: "2.2", name: "SimonGame.mp4", type: 'video' },
            ],
        },
        {
            id: "3",
            name: "Downloads",
            children: [
                {
                    id: "3.1",
                    name: "Drivers",
                    children: [
                        { id: "3.1.1", name: "Printerdriver.dmg" },
                        { id: "3.1.2", name: "cameradriver.dmg" },
                    ],
                },
                {
                    id: "3.2",
                    name: "Applications",
                    children: [
                        { id: "3.2.1", name: "Webstorm.dmg" },
                        { id: "3.2.2", name: "Pycharm.dmg" },
                        { id: "3.2.3", name: "FileZila.dmg" },
                        { id: "3.2.4", name: "Mattermost.dmg" },
                    ],
                },
                { id: "3.3", name: "chromedriver.dmg" },
            ],
        },
    ]);

    const toggleFolder = (id) => {
        setOpenFolders((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    // Render the file or folder
    const renderTree = (nodes) => (
        <ul className="list-group">
            <li
                className="list-group-item font-weight-bold"
                onClick={() => toggleFolder(nodes.id)}
                style={{ cursor: "pointer" }}
            >
                {nodes.name}
            </li>
            {Array.isArray(nodes.children) && openFolders[nodes.id] && (
                <ul className="list-group ml-4">
                    {nodes.children.map((child) => (
                        <li key={child.id} className="list-group-item">
                            {child.type === 'image' ? (
                                <div>
                                    <p>{child.name}</p>
                                    <img
                                        src={`/Files/${child.name}`}
                                        alt={child.name}
                                        style={{ maxWidth: "200px", height: "auto" }}
                                    />
                                </div>
                            ) : child.type === 'video' ? (
                                <div>
                                    <p>{child.name}</p>
                                    <video controls style={{ maxWidth: "200px" }}>
                                        <source
                                            src={`/Files/${child.name}`}
                                            type="video/mp4"
                                        />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            ) : (
                                renderTree(child) // For non-media files, just render as a folder
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </ul>
    );

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Folder Structure</h2>
            {folders.map((folder) => (
                <div key={folder.id}>{renderTree(folder)}</div>
            ))}
        </div>
    );
};

export default FolderStructure;
