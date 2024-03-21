// const EditorTemplate = ({ clients }) => {
//     const dispatch = useDispatch();
//     const comboBoxRef = useRef(null);
//     const [inputValue, setInputValue] = useState("");
//     const [myInputValue, setMyInputValue] = useState("");
//     console.log("3) inputValue:", inputValue);

//     // Define debounceDispatch within the scope of EditorTemplate
//     const debounceDispatch = useCallback(
//       debounce((text) => {
//         // console.log("4) inputValue: debounceDispatch:", inputValue);
//         // console.log("4) inputValue: debounceDispatch TEXT:", text);
//         dispatch(getClientSearch({ client: text }));
//         // console.log("5) inputValue: debounceDispatch text:", text);
//         // console.log("6) inputValue: debounceDispatch:", inputValue);
//       }, 300),

//       [dispatch]
//     );

//     const onFiltering = useCallback(
//       (e) => {
//         const newInputValue = e.text;
//         setMyInputValue(newInputValue)
//         setInputValue(newInputValue)
//         console.log("newInputtValue: ", inputtValue)


//         // console.log("1) inputValue: onFiltering:", inputValue);
//         // console.log("11) inputValue: setInputValue:", inputValue);

//         debounceDispatch(newInputValue);
//         // console.log("2) inputValue: after debounceDispatch :", inputValue);
//       },
//       [debounceDispatch]
//     );

//     // Focus the ComboBox when the component mounts
//     useEffect(() => {
//       if (comboBoxRef.current) {
//         comboBoxRef.current.focusIn();
//         // console.log("inputValue: useEffect:", inputValue);
//       }
//     }, []);

//     return (
//       <div className="custom-event-editor">
//         <div className="flex-prop">
//           <ComboBoxComponent
//             ref={comboBoxRef}
//             value={inputValue}
//             id="appointment-field"
//             dataSource={clients}
//             allowFiltering={true}
//             fields={{ text: "name", value: "id" }}
//             filtering={onFiltering}
//             placeholder="Client Name"
//           />
//         </div>
//       </div>
//     );
//   };