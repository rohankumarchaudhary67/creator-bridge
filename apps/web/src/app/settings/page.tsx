'use client';

import CreatorSetting from './CreatorSetting';
import EditorSettingsPage from './Editorsettings';

export default function SettingsContainer() {
    const user = 'Creator';

    return (
        <div className="2xl:px-72 md:px-36 px-6 py-6 bg-[#181d28] min-h-screen">
            {user === 'Editor' ? <EditorSettingsPage /> : <CreatorSetting />}
        </div>
    );
}
