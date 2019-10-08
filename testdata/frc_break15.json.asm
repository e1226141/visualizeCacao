MBB:0076 
0x00007fafa075e120:   90                               nop
0x00007fafa075e121:   b8 00 00 00 00                   mov    $0x0,%eax
0x00007fafa075e126:   8b 4f 10                         mov    0x10(%rdi),%ecx
MBB:0077 
0x00007fafa075e129:   3b c1                            cmp    %ecx,%eax
0x00007fafa075e12b:   0f 8d 05 00 00 00                jge    0x00007fafa075e136
0x00007fafa075e131:   e9 05 00 00 00                   jmpq   0x00007fafa075e13b
MBB:0082 
0x00007fafa075e136:   e9 36 00 00 00                   jmpq   0x00007fafa075e171
MBB:0078 
0x00007fafa075e13b:   8b d0                            mov    %eax,%edx
0x00007fafa075e13d:   44 8b c0                         mov    %eax,%r8d
0x00007fafa075e140:   8b c2                            mov    %edx,%eax
0x00007fafa075e142:   99                               cltd   
0x00007fafa075e143:   f7 fe                            idiv   %esi
0x00007fafa075e145:   41 b9 00 00 00 00                mov    $0x0,%r9d
0x00007fafa075e14b:   41 8b c0                         mov    %r8d,%eax
0x00007fafa075e14e:   41 3b d1                         cmp    %r9d,%edx
0x00007fafa075e151:   0f 85 05 00 00 00                jne    0x00007fafa075e15c
0x00007fafa075e157:   e9 15 00 00 00                   jmpq   0x00007fafa075e171
MBB:0079 
0x00007fafa075e15c:   ba 00 00 00 00                   mov    $0x0,%edx
0x00007fafa075e161:   89 54 87 18                      mov    %edx,0x18(%rdi,%rax,4)
0x00007fafa075e165:   ba 01 00 00 00                   mov    $0x1,%edx
0x00007fafa075e16a:   03 c2                            add    %edx,%eax
0x00007fafa075e16c:   e9 b8 ff ff ff                   jmpq   0x00007fafa075e129
MBB:0080 
MBB:0081 
0x00007fafa075e171:   c3                               retq   
