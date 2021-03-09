import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { TextInputProps } from "react-native";
import { useField } from "@unform/core";

import { Container, TextInput, Icon } from "./styles";
interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref
) => {
  const InputElementRef = useRef<any>(null);
  const { registerField, defaultValue = "", fieldName, error } = useField(name);
  const InputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!InputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      InputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: InputValueRef.current,
      path: "value",
      setValue(ref: any, value: string) {
        InputValueRef.current.value = value;
        InputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        InputValueRef.current.value = "";
        InputElementRef.current.clear;
      },
    });
  }, [registerField, fieldName]);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? "#ff9000" : "#666360"}
      />
      <TextInput
        ref={InputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={value => {
          InputValueRef.current.value = value;
        }}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
