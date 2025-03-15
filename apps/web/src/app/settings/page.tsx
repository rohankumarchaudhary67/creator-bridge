import CreatorSetting from '../../components/settings/CreatorSetting';
import EditorSettingsPage from '../../components/settings/EditorSettings';

export default function SettingsContainer() {
    // Temporary setting design
    const user = 'Creator';
    const res = 'Creator';

    return (
        <div className="2xl:px-72 md:px-36 px-6 py-6 bg-[#181d28] min-h-screen">
            {user === res ? <EditorSettingsPage /> : <CreatorSetting />}
        </div>
    );
}
