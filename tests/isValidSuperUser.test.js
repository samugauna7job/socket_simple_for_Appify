import isValidSuperUser from "../dbBack/requestTo.js";
describe('isValidSuperUser function', () => {
    test('Valid superuser ID should return true', async () => {
        const superUserId = "super-user-f32a4f32-ae6d-453f-a2b0-59f769f80b3b";
        const isValid = await isValidSuperUser(superUserId);
        expect(isValid).toBe(true);
    });
    test('Invalid superuser ID should return false', async () => {
        const superUserId = "id_del_super_usuario";
        const isValid = await isValidSuperUser(superUserId);
        expect(isValid).toBe(false);
    });
});
