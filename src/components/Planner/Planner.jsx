import React, { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { ChevronRight, Grid3x3, LayoutGrid, Calendar, BarChart3, Plus, Share, MoreHorizontal, Pin, Edit2, Trash2, Upload, X, Sparkles } from 'lucide-react';
import './Planner.css';

const Planner = ({
    activeTrip,
    trips,
    onUpdateTripName,
    onTogglePin,
    onAddSection,
    onUpdateSectionName,
    onDeleteSection,
    onAddItem,
    onDeleteItem,
    onReorderSections,
    onMoveItem
}) => {
    const [activeView, setActiveView] = useState('Grid');
    const [editingTripName, setEditingTripName] = useState(false);
    const [editingSection, setEditingSection] = useState(null);
    const [tempName, setTempName] = useState('');

    if (!activeTrip) {
        return (
            <div className="planner-container">
                <div style={{ padding: '40px', textAlign: 'center' }}>
                    <h2>No trip selected</h2>
                    <p>Select a trip from the sidebar or create a new one</p>
                </div>
            </div>
        );
    }

    const trip = trips.find(t => t.id === activeTrip);
    if (!trip) return null;

    const handleTripNameClick = () => {
        setTempName(trip.name);
        setEditingTripName(true);
    };

    const handleTripNameSave = () => {
        if (tempName.trim()) {
            onUpdateTripName(trip.id, tempName.trim());
        }
        setEditingTripName(false);
    };

    const handleSectionNameClick = (sectionId, currentName) => {
        setTempName(currentName);
        setEditingSection(sectionId);
    };

    const handleSectionNameSave = (sectionId) => {
        if (tempName.trim()) {
            onUpdateSectionName(trip.id, sectionId, tempName.trim());
        }
        setEditingSection(null);
    };

    const handleAddItem = (sectionId, itemData) => {
        onAddItem(trip.id, sectionId, itemData);
    };

    const handleDragEnd = (result) => {
        console.log('DRAG END CALLED:', result);

        if (!result.destination) {
            console.log('No destination - drag cancelled');
            return;
        }

        const { source, destination, type } = result;
        console.log('Drag details:', { source, destination, type });

        if (type === 'section') {
            // Reorder sections
            if (source.index !== destination.index) {
                console.log('Calling onReorderSections');
                onReorderSections(trip.id, source.index, destination.index);
            }
        } else if (type === 'item') {
            // Move items between sections
            const sourceSectionId = parseInt(source.droppableId);
            const destSectionId = parseInt(destination.droppableId);

            if (sourceSectionId === destSectionId && source.index === destination.index) {
                console.log('Same position - no change');
                return; // No change
            }

            console.log('Calling onMoveItem');
            onMoveItem(trip.id, sourceSectionId, source.index, destSectionId, destination.index);
        }
    };

    const sortedSections = [...trip.sections].sort((a, b) => a.order - b.order);

    return (
        <div className="planner-container">
            <div className="planner-header">
                <div className="planner-title-section">
                    <div className="planner-breadcrumb">
                        <span>My Plans</span>
                        <ChevronRight size={14} />
                    </div>
                    <div className="planner-trip-title">
                        {editingTripName ? (
                            <input
                                type="text"
                                className="trip-name-input"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                onBlur={handleTripNameSave}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleTripNameSave();
                                    if (e.key === 'Escape') setEditingTripName(false);
                                }}
                                autoFocus
                            />
                        ) : (
                            <>
                                <span onClick={handleTripNameClick}>{trip.name}</span>
                                <button className="icon-btn" onClick={handleTripNameClick}>
                                    <Edit2 size={14} />
                                </button>
                                <button
                                    className={`icon-btn ${trip.isPinned ? 'active' : ''}`}
                                    onClick={() => onTogglePin(trip.id)}
                                    title={trip.isPinned ? 'Unpin from sidebar' : 'Pin to sidebar'}
                                >
                                    <Pin size={14} />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="planner-views">
                    <button
                        className={`view-tab ${activeView === 'Grid' ? 'active' : ''}`}
                        onClick={() => setActiveView('Grid')}
                    >
                        <Grid3x3 size={16} />
                        Grid
                    </button>
                    <button
                        className={`view-tab ${activeView === 'Board' ? 'active' : ''}`}
                        onClick={() => setActiveView('Board')}
                    >
                        <LayoutGrid size={16} />
                        Board
                    </button>
                    <button
                        className={`view-tab ${activeView === 'Schedule' ? 'active' : ''}`}
                        onClick={() => setActiveView('Schedule')}
                    >
                        <Calendar size={16} />
                        Schedule
                    </button>
                    <button
                        className={`view-tab ${activeView === 'Charts' ? 'active' : ''}`}
                        onClick={() => setActiveView('Charts')}
                    >
                        <BarChart3 size={16} />
                        Charts
                    </button>
                </div>

                <div className="planner-actions">
                    <button className="planner-btn journii-ai-btn">
                        <Sparkles size={14} /> Create With Journii AI
                    </button>
                    <button className="planner-btn">
                        <Share size={14} /> Share
                    </button>
                    <button className="planner-btn">
                        <MoreHorizontal size={14} />
                    </button>
                </div>
            </div>

            {/* Board View */}
            {activeView === 'Board' && (
                <div className="planner-board">
                    <Droppable droppableId="board" direction="horizontal" type="section">
                    {(provided) => (
                        <div
                            className="board-columns"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {sortedSections.map((section, index) => (
                                <Draggable
                                    key={section.id}
                                    draggableId={`section-${section.id}`}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className={`board-column ${snapshot.isDragging ? 'dragging' : ''}`}
                                        >
                                            <div
                                                className="column-header"
                                                {...provided.dragHandleProps}
                                            >
                                                {editingSection === section.id ? (
                                                    <input
                                                        type="text"
                                                        className="section-name-input"
                                                        value={tempName}
                                                        onChange={(e) => setTempName(e.target.value)}
                                                        onBlur={() => handleSectionNameSave(section.id)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') handleSectionNameSave(section.id);
                                                            if (e.key === 'Escape') setEditingSection(null);
                                                        }}
                                                        autoFocus
                                                    />
                                                ) : (
                                                    <>
                                                        <span onClick={() => handleSectionNameClick(section.id, section.name)}>
                                                            {section.name}
                                                        </span>
                                                        <div className="column-header-actions">
                                                            <button
                                                                className="icon-btn-small"
                                                                onClick={() => handleSectionNameClick(section.id, section.name)}
                                                            >
                                                                <Edit2 size={12} />
                                                            </button>
                                                            {trip.sections.length > 1 && (
                                                                <button
                                                                    className="icon-btn-small"
                                                                    onClick={() => {
                                                                        if (confirm(`Delete "${section.name}" section?`)) {
                                                                            onDeleteSection(trip.id, section.id);
                                                                        }
                                                                    }}
                                                                >
                                                                    <Trash2 size={12} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </>
                                                )}
                                            </div>

                                            <Droppable droppableId={`${section.id}`} type="item">
                                                {(provided, snapshot) => (
                                                    <div
                                                        className={`column-tasks ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                    >
                                                        {section.items.map((item, itemIndex) => (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={`item-${item.id}`}
                                                                index={itemIndex}
                                                            >
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className={`task-card ${snapshot.isDragging ? 'dragging' : ''}`}
                                                                    >
                                                                        <ItemCard
                                                                            item={item}
                                                                            onDelete={() => onDeleteItem(trip.id, section.id, item.id)}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>

                                            <ItemInput onAdd={(itemData) => handleAddItem(section.id, itemData)} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}

                            {/* Add Column Button */}
                            <div className="board-column add-column-btn" onClick={() => onAddSection(trip.id)}>
                                <div className="add-column-content">
                                    <Plus size={20} />
                                    <span>Add Column</span>
                                </div>
                            </div>
                        </div>
                    )}
                </Droppable>
            </div>
            )}

            {/* Grid View */}
            {activeView === 'Grid' && (
                <div className="planner-grid-view">
                    <div className="grid-container">
                        {sortedSections.map((section) => (
                            <div key={section.id} className="grid-section">
                                <div className="grid-section-header">
                                    <h3>{section.name}</h3>
                                    <div className="grid-section-actions">
                                        <button className="icon-btn-small" onClick={() => handleSectionNameClick(section.id, section.name)}>
                                            <Edit2 size={12} />
                                        </button>
                                    </div>
                                </div>
                                <div className="grid-items">
                                    {section.items.map((item) => (
                                        <div key={item.id} className="grid-item-card">
                                            <ItemCard item={item} onDelete={() => onDeleteItem(trip.id, section.id, item.id)} />
                                        </div>
                                    ))}
                                    <div className="grid-add-item">
                                        <ItemInput onAdd={(itemData) => handleAddItem(section.id, itemData)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Schedule View */}
            {activeView === 'Schedule' && (
                <div className="planner-schedule-view">
                    <div className="schedule-timeline">
                        {sortedSections.map((section, index) => (
                            <div key={section.id} className="schedule-day">
                                <div className="schedule-day-header">
                                    <div className="day-number">Day {index + 1}</div>
                                    <h3>{section.name}</h3>
                                </div>
                                <div className="schedule-items">
                                    {section.items.map((item, itemIndex) => (
                                        <div key={item.id} className="schedule-item">
                                            <div className="schedule-time">
                                                {`${8 + itemIndex * 2}:00`}
                                            </div>
                                            <div className="schedule-item-content">
                                                <ItemCard item={item} onDelete={() => onDeleteItem(trip.id, section.id, item.id)} />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="schedule-add-item">
                                        <ItemInput onAdd={(itemData) => handleAddItem(section.id, itemData)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Charts View */}
            {activeView === 'Charts' && (
                <div className="planner-charts-view">
                    <div className="charts-container">
                        <div className="chart-card">
                            <h3>Trip Overview</h3>
                            <p>Charts and analytics coming soon...</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


// Item Card Component
const ItemCard = ({ item, onDelete }) => {
    return (
        <div className="item-content">
            {item.type === 'text' && <p>{item.content}</p>}
            {item.type === 'link' && (
                <a href={item.content} target="_blank" rel="noopener noreferrer">
                    {item.content}
                </a>
            )}
            {item.type === 'image' && (
                <div className="media-preview">
                    <img src={item.content} alt="Uploaded" />
                </div>
            )}
            {item.type === 'video' && (
                <div className="media-preview">
                    <video controls src={item.content} />
                </div>
            )}
            <button className="delete-item-btn" onClick={onDelete}>×</button>
        </div>
    );
};

// Enhanced Item Input Component with file upload
const ItemInput = ({ onAdd }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [content, setContent] = useState('');
    const fileInputRef = React.useRef(null);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result;
            const type = file.type.startsWith('image/') ? 'image' : 'video';
            onAdd({ type, content: base64, preview: null });
            setIsAdding(false);
        };
        reader.readAsDataURL(file);
    };

    const handleAdd = () => {
        if (content.trim()) {
            const isUrl = content.trim().match(/^https?:\/\//);
            onAdd({ type: isUrl ? 'link' : 'text', content: content.trim(), preview: null });
            setContent('');
            setIsAdding(false);
        }
    };

    if (!isAdding) {
        return (
            <div className="add-item-section">
                <button className="add-task-btn" onClick={() => setIsAdding(true)}>
                    <Plus size={14} />
                    Add item
                </button>
            </div>
        );
    }

    return (
        <div className="item-input-container">
            <input
                type="text"
                className="item-input"
                placeholder="Type text or paste a link..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAdd();
                    if (e.key === 'Escape') {
                        setIsAdding(false);
                        setContent('');
                    }
                }}
                autoFocus
            />
            <div className="item-input-actions">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    style={{ display: 'none' }}
                    onChange={handleFileSelect}
                />
                <button
                    className="btn-secondary btn-icon"
                    onClick={() => fileInputRef.current.click()}
                    title="Upload image or video"
                >
                    <Upload size={14} />
                </button>
                <button className="btn-secondary" onClick={() => {
                    setIsAdding(false);
                    setContent('');
                }}>Cancel</button>
                <button className="btn-primary" onClick={handleAdd}>Add</button>
            </div>
        </div>
    );
};

export default Planner;
