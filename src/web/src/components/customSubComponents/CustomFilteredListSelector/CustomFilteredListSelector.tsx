import React, {
    ChangeEvent,
    FunctionComponent,
    HTMLInputTypeAttribute,
    useRef,
    useState,
    useEffect,
    CSSProperties,
    useMemo,
    Dispatch,
    SetStateAction,
} from "react";
import styleModule from "./CustomFilteredListSelector.module.css";
import CustomButton from "../customButton/customButton";

export type CustomFilteredListKeyType = { title: string; key: number };

interface CustomFilteredListSelectorProps {
    children?: any;
    className?: string;
    keys: CustomFilteredListKeyType[];

    inputType?: HTMLInputTypeAttribute;
    alertColor?: string;
    setSelectedKey: Dispatch<SetStateAction<number>>;
}

const CustomFilteredListSelector: FunctionComponent<
    CustomFilteredListSelectorProps
> = ({
    children,
    className,
    inputType = "text",
    keys = [
        {
            title: "default 1",
            key: 0,
        },
        {
            title: "default 2",
            key: 1,
        },
    ],
    alertColor = "var(--warning_button_color)",
    setSelectedKey,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null); // Add a ref for the dropdown
    const [value, setValue] = useState<string>("");
    const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);
    const [alert, setAlert] = useState<boolean>(true);

    const buttonStyleTemplate: CSSProperties = useMemo(
        () => ({
            border: "solid",

            borderColor: alertColor,
            borderWidth: alert ? "0px 0px 4px 0px" : "0",
        }),
        [alert, alertColor]
    );
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setValue(newVal);

        // Update dropdownIsOpen based on whether there's any input value or if it's already open
        setDropdownIsOpen(newVal.trim() !== "" || dropdownIsOpen);
    };

    const handleMainButtonClick = () => {
        if (!dropdownIsOpen) {
            setDropdownIsOpen(true); // Open the dropdown when the main button is clicked
            if (inputRef.current) {
                inputRef.current.focus(); // Focus on the input when the main button is clicked
            }
        }
    };
    useEffect(() => {
        const element = keys.find((el) => el.title === value);
        const found = element !== undefined;
        setAlert(!found);
        setSelectedKey(found ? element.key : -1);
    }, [value, keys, setSelectedKey]);

    const dropDownButtonClicked = (key: string) => {
        setValue(key); // Set the selected key as the new input value
        setDropdownIsOpen(false); // Close the dropdown after selecting an option
    };

    const makeDropdownButtons = () => {
        const filteredKeys = keys.filter((key) =>
            key.title.toLowerCase().includes(value.toLowerCase())
        );

        const buttons = filteredKeys.map((element) => (
            <CustomButton
                clickCallBack={() => dropDownButtonClicked(element.title)}
                className={styleModule.dropdown_button}
                key={"list_" + element.title}
                fontSize="var(--font_s)"
            >
                {element.title}
            </CustomButton>
        ));
        return buttons;
    };

    const handleDropdownClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the dropdown click event from reaching the input
    };

    const getClassName = () => {
        return [className, styleModule.custom_list_selector_div].join(" ");
    };

    const getExpandMenuIndicatorClassName = () => {
        if (dropdownIsOpen) {
            return [
                styleModule.expand_menu_indicator_open,
                styleModule.expand_menu_indicator,
            ].join(" ");
        }
        return [styleModule.expand_menu_indicator].join(" ");
    };

    return (
        <div className={getClassName()}>
            <button
                className={styleModule.custom_list_selector}
                onClick={handleMainButtonClick}
                style={buttonStyleTemplate}
            >
                <div className={styleModule.button_name}>{children}</div>
                <div className={styleModule.selected_div}>
                    <input
                        type={inputType}
                        className={styleModule.text_input}
                        ref={inputRef}
                        onChange={handleInputChange}
                        value={value}
                    />
                    <div className={getExpandMenuIndicatorClassName()} />
                </div>
            </button>
            {dropdownIsOpen ? (
                <div
                    className={styleModule.dropdown_div}
                    ref={dropdownRef}
                    onClick={handleDropdownClick} // Attach click handler to prevent dropdown click from reaching the input
                >
                    {makeDropdownButtons()}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default CustomFilteredListSelector;
