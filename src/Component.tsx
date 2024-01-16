import React, {
    useState,
    useRef,
    useEffect,
    ChangeEvent,
    KeyboardEvent,
    } from "react";
    import "./Component.css";
    import md5 from "crypto-js/md5";
    
    interface Chip {
    id: number;
    label: string;
    }
    
    const Component: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [chips, setChips] = useState<Chip[]>([]);
    const [filteredItems, setFilteredItems] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const allItems: string[] = [
    "William Brown",
    "Emily Smith",
    "Liam Johnson",
    "Olivia Davis",
    "Noah Wilson",
    "Sophia Miller",
    "Elijah Anderson",
    "Ava Martinez",
    "Benjamin Taylor",
    "Mia Thomas",
    ];
    
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    
    if (value.trim() === "") {
    setFilteredItems([]);
    } else {
    const filtered = allItems.filter(
    (item) =>
    !chips.some((chip) => chip.label === item) &&
    item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
    }
    };
    
    const handleItemClick = (item: string) => {
    setChips((prevChips) => [...prevChips, { id: Date.now(), label: item }]);
    setInputValue("");
    setFilteredItems([]);
    };
    
    const handleChipRemove = (chipId: number) => {
    setChips((prevChips) => prevChips.filter((chip) => chip.id !== chipId));
    };
    
    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && inputValue === "" && chips.length > 0) {
    const lastChip = chips[chips.length - 1];
    handleChipRemove(lastChip.id);
    }
    };
    
    useEffect(() => {
    if (inputRef.current) {
    inputRef.current.focus();
    }
    }, [chips]);
    
    const hash = (label) => {
    return md5(label).toString();
    };
    
    return (
    <div className="your-container">
    <div className="search-box">
    <div className="chips-container">
    {chips.map((chip) => (
    <div key={chip.id} className="chip">
    <img
    src={`https://www.gravatar.com/avatar/${hash(
    chip.label
    )}?d=identicon&s=24`}
    alt="Avatar"
    className="avatar"
    />
    
    {chip.label}
    <button
    className="chip-button"
    onClick={() => handleChipRemove(chip.id)}
    >
    X
    </button>
    </div>
    ))}
    </div>
    <input
    ref={inputRef}
    type="text"
    value={inputValue}
    onChange={handleInputChange}
    onKeyDown={handleInputKeyDown}
    placeholder="Type here..."
    className="search-input"
    />
    </div>
    <ul className="item-list">
    {filteredItems.map((item) => (
    <li key={item} onClick={() => handleItemClick(item)}>
    <img
    src={`https://www.gravatar.com/avatar/${hash(
    item
    )}?d=identicon&s=24`}
    alt="Avatar"
    className="avatar"
    />
    {item}
    </li>
    ))}
    </ul>
    </div>
    );
    };
    
    export default Component;