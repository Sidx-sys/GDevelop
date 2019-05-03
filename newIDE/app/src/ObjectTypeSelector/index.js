// @flow
import { Trans } from '@lingui/macro';

import * as React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {
  enumerateObjectTypes,
  type EnumeratedObjectMetadata,
} from '../ObjectsList/EnumerateObjects';

type Props = {|
  project: gdProject,
  floatingLabelText?: React.Node,
  value: string,
  onChange: string => void,
  disabled?: boolean,
|};
type State = {|
  objectMetadata: Array<EnumeratedObjectMetadata>,
|};

export default class ObjectTypeSelector extends React.Component<Props, State> {
  state = {
    objectMetadata: enumerateObjectTypes(this.props.project),
  };

  render() {
    const { disabled, value, onChange, floatingLabelText } = this.props;
    const { objectMetadata } = this.state;

    return (
      <SelectField
        floatingLabelText={floatingLabelText || <Trans>Object type</Trans>}
        floatingLabelFixed
        value={value}
        onChange={(e, i, value) => {
          onChange(value);
        }}
        disabled={disabled}
        fullWidth
      >
        <MenuItem value="" primaryText={<Trans>Any object</Trans>} />
        {objectMetadata.map((metadata: EnumeratedObjectMetadata) => {
          if (metadata.name === '') {
            // Base object is an "abstract" object
            return null;
          }

          return (
            <MenuItem
              key={metadata.name}
              value={metadata.name}
              primaryText={metadata.fullName}
            />
          );
        })}
      </SelectField>
    );
  }
}
