import { merge } from 'lodash';
import Card from './Card';
import Lists from './Lists';
import Input from './Input';
import Button from './Button';
import Typography from './Typography';
import IconButton from './IconButton';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return merge(
    Card(theme),
    Lists(theme),
    Input(theme),
    Button(theme),
    Typography(theme),
    IconButton(theme),
  );
}
