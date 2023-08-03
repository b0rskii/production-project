module.exports = (sliceName) => `import { StateSchema } from '1_app/providers/StoreProvider';
import { initialState } from '../slice/${sliceName}Slice';
`;
