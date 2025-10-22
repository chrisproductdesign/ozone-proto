import { useState } from 'react';

import {
  Badge,
  Button,
  Card,
  MetricCard,
  AccountCard,
  Input,
  Select,
  Slider,
  Table,
  Tabs,
  Sidebar,
} from '../../src/components';

/**
 * Component Showcase
 * A dedicated space for iterating on component design, styling, and UX
 * Test individual components and their variants before integrating into flows
 */
export const ComponentShowcase = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('option1');
  const [sliderValue, setSliderValue] = useState(50);
  const [activeTab, setActiveTab] = useState('buttons');

  return (
    <div style={{ padding: '2rem', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', color: '#0f172a' }}>
          Component Lab
        </h1>

        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Trigger value="buttons">Buttons & Actions</Tabs.Trigger>
            <Tabs.Trigger value="forms">Form Controls</Tabs.Trigger>
            <Tabs.Trigger value="cards">Cards & Display</Tabs.Trigger>
            <Tabs.Trigger value="feedback">Feedback & Status</Tabs.Trigger>
          </Tabs.List>

          {/* Buttons & Actions */}
          <Tabs.Content value="buttons">
            <Card style={{ padding: '2rem' }}>
              <h2 style={{ marginBottom: '1.5rem' }}>Button Variants</h2>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <Button variant="primary">Primary Action</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="danger">Danger Action</Button>
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="primary" loading>Loading...</Button>
              </div>

              <h3 style={{ marginBottom: '1rem' }}>Button Sizes</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button fullWidth>Full Width Button</Button>
              </div>
            </Card>
          </Tabs.Content>

          {/* Form Controls */}
          <Tabs.Content value="forms">
            <Card style={{ padding: '2rem' }}>
              <h2 style={{ marginBottom: '1.5rem' }}>Form Controls</h2>

              <div style={{ display: 'grid', gap: '2rem' }}>
                <div>
                  <h3 style={{ marginBottom: '1rem' }}>Input Variants</h3>
                  <div style={{ display: 'grid', gap: '1rem', maxWidth: '400px' }}>
                    <Input
                      placeholder="Default input"
                      value={inputValue}
                      onValueChange={setInputValue}
                    />
                    <Input
                      placeholder="With label"
                      aria-label="Field with label"
                    />
                    <Input
                      placeholder="Error state"
                      status="danger"
                      aria-invalid="true"
                    />
                    <Input
                      placeholder="Success state"
                      status="success"
                      aria-describedby="success-message"
                    />
                  </div>
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem' }}>Select Dropdown</h3>
                  <div style={{ maxWidth: '400px' }}>
                    <Select
                      value={selectValue}
                      onChange={setSelectValue}
                      options={[
                        { value: 'option1', label: 'Option 1' },
                        { value: 'option2', label: 'Option 2' },
                        { value: 'option3', label: 'Option 3' },
                      ]}
                    />
                  </div>
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem' }}>Slider</h3>
                  <div style={{ maxWidth: '400px' }}>
                    <Slider
                      label="Funding Amount"
                      value={sliderValue}
                      onChange={setSliderValue}
                      min={0}
                      max={100}
                      formatValue={(v) => `${v}%`}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </Tabs.Content>

          {/* Cards & Display */}
          <Tabs.Content value="cards">
            <div style={{ display: 'grid', gap: '2rem' }}>
              <Card style={{ padding: '2rem' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Card Variants</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                  <Card>
                    <h3>Basic Card</h3>
                    <p>Standard card with padding and border</p>
                  </Card>

                  <MetricCard
                    label="Revenue"
                    value="$125,000"
                    trendValue="+12.5%"
                    trend="up"
                  />

                  <AccountCard
                    name="Business Checking"
                    balance="$45,678"
                    changePercent="+5.2%"
                    isPositive={true}
                  />
                </div>
              </Card>

              <Card style={{ padding: '2rem' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Data Table</h2>
                <Table.Root>
                  <Table.Head>
                    <Table.Row>
                      <Table.HeaderCell>Transaction</Table.HeaderCell>
                      <Table.HeaderCell>Amount</Table.HeaderCell>
                      <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Payment from Client</Table.Cell>
                      <Table.Cell>$5,000</Table.Cell>
                      <Table.Cell>
                        <Badge variant="success">Completed</Badge>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Wire Transfer</Table.Cell>
                      <Table.Cell>$2,500</Table.Cell>
                      <Table.Cell>
                        <Badge variant="warning">Pending</Badge>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Root>
              </Card>
            </div>
          </Tabs.Content>

          {/* Feedback & Status */}
          <Tabs.Content value="feedback">
            <Card style={{ padding: '2rem' }}>
              <h2 style={{ marginBottom: '1.5rem' }}>Status Indicators</h2>

              <div style={{ display: 'grid', gap: '2rem' }}>
                <div>
                  <h3 style={{ marginBottom: '1rem' }}>Badges</h3>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Badge variant="default">Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="danger">Danger</Badge>
                    <Badge variant="info">Info</Badge>
                  </div>
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem' }}>Loading States</h3>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <Button loading>Processing...</Button>
                    <div style={{ padding: '1rem', background: 'white', borderRadius: '8px' }}>
                      <p>Skeleton loader placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};