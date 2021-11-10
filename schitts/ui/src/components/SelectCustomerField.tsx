import React, {FC, forwardRef, SelectHTMLAttributes, useState} from "react";
import {FormGroup, Select, SelectDirection, SelectOption, SelectVariant} from "@patternfly/react-core";
import {ExclamationCircleIcon} from "@patternfly/react-icons";
import {useQuery} from "react-query";
import {getCustomerTypes} from "api";
import styled from "styled-components";

const SelectCustomerFieldComponent:FC<SelectHTMLAttributes<HTMLSelectElement>> = React.memo(
    forwardRef((props, _) => {

    const [isOpen, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<any>();
    const {data, isLoading, isError} = useQuery("getCustomerTypes", getCustomerTypes);

    const createState = (id, name) => {
        return {
            id: id,
            name: name,
            toString: function() {
                return `${this.name}`;
            },
        };
    };

    const onToggle = () => setOpen(!isOpen);

    const onSelect = (event, selection, isPlaceholder) => {
        if (isPlaceholder) {
            clearSelection()
        } else {
            props.onChange!(selection.id)
        }
        setSelected(selection.name);
        setOpen(false);
    };

    const clearSelection = () => {
        setSelected(null);
        setOpen(false);
    };

    return (
        <FormGroup
            label="Type"
            fieldId={"contract_date"}
            helperTextInvalidIcon={<ExclamationCircleIcon/>}
            autoComplete="off"
            isRequired
        >
            <Select
                variant={SelectVariant.single}
                aria-label="select customer type"
                onToggle={onToggle}
                onSelect={onSelect}
                selections={selected}
                isOpen={isOpen}
                required
                aria-labelledby="select customer type"
                direction={SelectDirection.down}
                isDisabled={isLoading||isError}
            >
                {data?.map((type) =>
                    <SelectOption
                        key={type.id}
                        value={createState(
                            type.id,
                            type.name.charAt(0).toUpperCase() + type.name.slice(1)
                        )}
                    />
                )}
            </Select>
        </FormGroup>
    )
}));

const SelectCustomerField = styled(SelectCustomerFieldComponent)`
  /* CSS styles here. */
`;

export default SelectCustomerField;
